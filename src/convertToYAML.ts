const YAML = require('json-to-pretty-yaml');
import { prompt } from 'inquirer';
import { writeFile } from 'fs';
import { getCourses } from './index';

(async () => {

    const courses = await getCourses();
    console.log(courses);

    if (courses.length == 0) {
        throw new Error('No courses entered. Aborting...');
        return;
    }

    let yamlResult = YAML.stringify(courses);

    let { confirmed } = await prompt([{
        type: 'confirm',
        name: 'confirmed',
        message: `${yamlResult}\n Is this ok?`
    }]);

    console.log(confirmed);

    if (!confirmed) {
        console.log("Aborting...");
        return;
    }

    writeFile('office-hours.yaml' , YAML.stringify(courses), () => {
        console.log("%c Yaml file successfully created!", 'color: #00ffcc');
        // Tell them about the check available office hours thing.
    });
})();
