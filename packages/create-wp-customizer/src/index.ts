import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import mri from 'mri';
import colors from 'picocolors';
import * as prompts from '@clack/prompts';

const {
  blue,
  yellow,
  greenBright
} = colors

const argv = mri<{
  template?: string
  help?: boolean
  overwrite?: boolean
  name?: string
}>(process.argv.slice(2), {
  alias: { h: 'help', t: 'template' },
  boolean: ['help', 'overwrite'],
  string: ['template', 'name'],
})
const cwd = process.cwd();

const helpMessage = `\
Usage: @devgateway/create-wp-customizer [OPTION]... [DIRECTORY]

Create a new Data Viz WordPress Customizer project.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template
  -n, --name NAME            use a specific name. This is the name of the project directory. (optional)
Available templates:
${yellow    ('template-js'  )}
${blue    ('template-ts'   )}`

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

const template = argv.template || 'template-js';

const main = async () => {
  try {
    const help = argv.help
    if (help) {
      console.log(helpMessage)
      return
    }

    const cancel = () => {
      console.log(yellow('Operation cancelled.'));
      process.exit(0);
    }

    const result = await prompts.select({
      message: 'Select a template',
      options: [
        { value: 'template-js', label: 'template-js' },
        { value: 'template-ts', label: 'template-ts' },
      ],
      initialValue: template
    });

    if (prompts.isCancel(result)) {
      cancel();
    }

    const templatePath = path.join(__dirname, '..', 'templates', result.toString());

    const projectName = await prompts.text({
      message: 'Enter the project name',
      defaultValue: argv.name,
    })

    if (prompts.isCancel(projectName)) {
      cancel();
    }

    const projectPath = path.join(cwd, projectName.toString());

    if (fs.existsSync(projectPath)) {
      cancel()
    }

    fs.cpSync(templatePath, projectPath, { recursive: true });

    console.log(`Project ${greenBright(projectName.toString())} created successfully`);
  } catch (error) {
    console.error(yellow('An error occurred:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main()