const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const entityTemplate = ({ entityName, fields }) => `
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
${fields
  .filter((field) => field.relation)
  .map(
    (field) =>
      `import { ${field.relation.target} } from './${field.relation.target}';`,
  )
  .join('\n')}

@Entity('${entityName.toLowerCase()}')
export class ${entityName} {
  @PrimaryGeneratedColumn()
  id: number;

${fields
  .map((field) => {
    if (field.relation) {
      const relationDecorator = `@${field.relation.type}(() => ${field.relation.target}${field.relation.inverseField ? `, (${field.relation.target.toLowerCase()}) => ${field.relation.target.toLowerCase()}.${field.relation.inverseField}` : ''})`;
      return `  ${relationDecorator}${field.relation.type === 'ManyToMany' ? `\n  @JoinTable()` : ''}
  ${field.name}: ${field.relation.type === 'OneToMany' || field.relation.type === 'ManyToMany' ? `${field.relation.target}[]` : field.relation.target};
`;
    } else {
      return `  @Column(${field.options})
  ${field.name}: ${field.type};
`;
    }
  })
  .join('')}

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
`;

async function updateOrCreateEntity(entityName, fields) {
  const entityPath = path.join(__dirname, `${entityName}.ts`);
  const entityContent = entityTemplate({ entityName, fields });
  fs.writeFileSync(entityPath, entityContent.trim());
  console.log(
    `L'entité ${entityName} a été ${fs.existsSync(entityPath) ? 'modifiée' : 'créée'} avec succès: ${entityPath}`,
  );
}

async function addFieldToEntity(
  entityName,
  fieldName,
  fieldType,
  relation,
  options,
) {
  const entityPath = path.join(__dirname, `${entityName}.ts`);
  let fields = [];

  // Vérifier si l'entité existe déjà
  if (fs.existsSync(entityPath)) {
    const existingContent = fs.readFileSync(entityPath, 'utf-8');
    const fieldMatches = existingContent.match(
      /@(Column|ManyToOne|OneToMany|ManyToMany|JoinTable)\((.*?)\)\s+(\w+):\s+([\w\[\]]+);/g,
    );

    if (fieldMatches) {
      fields = fieldMatches.map((match) => {
        const [, decorator, options, name, type] = match.match(
          /@(Column|ManyToOne|OneToMany|ManyToMany|JoinTable)\((.*?)\)\s+(\w+):\s+([\w\[\]]+);/,
        );
        const relationMatch = decorator.match(/ManyToOne|OneToMany|ManyToMany/);

        if (relationMatch) {
          const [, target, inverseField] = options.match(
            /\(\(\) => (\w+)(?:,\s*\(\w+\) => \w+\.(\w+))?\)/,
          ) || [, '', ''];

          return {
            name,
            type: 'any',
            options: '{}',
            relation: {
              type: relationMatch[0],
              target,
              inverseField: inverseField || null,
            },
          };
        } else {
          return {
            name,
            type,
            options: options.trim(),
          };
        }
      });
    }
  }

  // Ajouter ou mettre à jour le champ
  const existingFieldIndex = fields.findIndex(
    (field) => field.name === fieldName,
  );
  if (existingFieldIndex !== -1) {
    fields[existingFieldIndex] = {
      name: fieldName,
      type: relation ? 'any' : fieldType,
      options: options,
      relation,
    };
  } else {
    fields.push({
      name: fieldName,
      type: relation ? 'any' : fieldType,
      options: options,
      relation,
    });
  }

  // Mettre à jour ou créer l'entité
  await updateOrCreateEntity(entityName, fields);
}

async function main() {
  const { entityName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: "Nom de l'entité:",
      validate: (input) =>
        input ? true : "Le nom de l'entité ne peut pas être vide.",
    },
  ]);

  let addAnotherField = true;

  while (addAnotherField) {
    const { fieldName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'fieldName',
        message: 'Nom du champ:',
        validate: (input) =>
          input ? true : 'Le nom du champ ne peut pas être vide.',
      },
    ]);

    const { fieldType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'fieldType',
        message: 'Type du champ:',
        choices: [
          'string',
          'number',
          'boolean',
          'date',
          'text',
          'ManyToOne',
          'OneToMany',
          'ManyToMany',
        ],
        default: 'string',
      },
    ]);

    let relation = null;
    let options = '{}';
    if (['ManyToOne', 'OneToMany', 'ManyToMany'].includes(fieldType)) {
      const { targetEntity, inverseField } = await inquirer.prompt([
        {
          type: 'input',
          name: 'targetEntity',
          message: "Nom de l'entité cible pour la relation:",
          validate: (input) =>
            input ? true : "Le nom de l'entité cible ne peut pas être vide.",
        },
        {
          type: 'input',
          name: 'inverseField',
          message:
            "Nom du champ inverse dans l'entité cible (laisser vide si non applicable):",
        },
      ]);

      relation = {
        type: fieldType.replace(/-/g, ''),
        target: targetEntity,
        inverseField: inverseField || null,
      };

      // Ajouter la relation inverse automatiquement
      const inverseRelationType =
        fieldType === 'ManyToOne'
          ? 'OneToMany'
          : fieldType === 'OneToMany'
            ? 'ManyToOne'
            : 'ManyToMany';
      const inverseRelation = {
        type: inverseRelationType.replace('-to-', 'To'),
        target: entityName,
        inverseField: fieldName,
      };
      const inverseFieldName = inverseField || `${entityName.toLowerCase()}s`;
      await addFieldToEntity(
        targetEntity,
        inverseFieldName,
        'any',
        inverseRelation,
        '{}',
      );
    } else {
      const { fieldOptions } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'fieldOptions',
          message: 'Options du champ:',
          choices: [
            { name: 'nullable', value: 'nullable', checked: false },
            { name: 'unique', value: 'unique', checked: false },
          ],
        },
      ]);

      const optionsObject = {};
      if (fieldOptions.includes('nullable')) optionsObject.nullable = true;
      if (fieldOptions.includes('unique')) optionsObject.unique = true;
      options =
        Object.keys(optionsObject).length > 0
          ? `{ ${JSON.stringify(optionsObject)
              .replace(/"([^"]+)":/g, '$1:')
              .slice(1, -1)} }`
          : '{}';
    }

    await addFieldToEntity(entityName, fieldName, fieldType, relation, options);

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Ajouter un autre champ?',
        default: false,
      },
    ]);

    addAnotherField = confirm;
  }
}

main().catch((error) => console.error(error));
