import { readFileSync } from 'fs';
import yaml from 'js-yaml';

let courses: any = yaml.load(readFileSync('office-hours.yaml', 'utf8'));

for (const course of courses) { 
    for (const instructor of course.instructors) {
    }
}