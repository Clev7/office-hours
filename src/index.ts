import { prompt } from 'inquirer';
import { Course, Instructor } from './interfaces';


export const getCourses = async () => {
    // Just check for length zero
    let courses: Array<Course> = [];
    let { courseName } = await prompt([{
            type: 'input',
            name: 'courseName',
            message: 'Enter course name(or hit enter if you\'re done):'
    }]);

    while (courseName) {

        let course: Course = {
            course: courseName,
        };

        let { classLink } = await prompt([{
            type: 'input',
            name: 'classLink',
            message: 'Enter the class\' zoom link(optional):'
        }]);

        if (classLink) course["class link"] = classLink;
        
        let { instructorName } = await prompt([{
            type: 'input',
            name: 'instructorName',
            message: 'Enter the name of a TA/Professor(or skip if done/none):'
        }]);

        if (!instructorName) {
            course.instructors = 'Not Available';
            break;
        }

        course.instructors = [];

        // Ask same question near the end (it's not the same thing)
        while (instructorName) {

            let instructor: any = {
                name: instructorName,
            };

            instructor.times = new Array<string>();

            instructor = instructor as Instructor;

            let { email } = await prompt([{
                type: 'input',
                name: 'email',
                message: 'Enter the TA/Professor\'s email(optional):'
            }]);
            
            if (email) instructor.email = email;

            let { zoomLink } = await prompt([{
                type: 'input',
                name: 'zoomLink',
                message: 'Enter a zoom link to the TA/Professor\'s office hours(optional):'
            }]);

            if (zoomLink) instructor["zoom link"] = zoomLink;

            let { choices } = await prompt([{
                    type: 'checkbox',
                    name: 'choices',
                    message: 'Choose his/her available days:',
                    choices: ['M', 'T', 'W', 'R', 'F']
            }]);

            while (choices.length === 0) {
                let { confirm } =  await prompt([{
                    type: 'confirm',
                    name: 'confirm',
                    message: 'Are you sure you don\'t want to mention a time?'
                }]);

                if (!confirm) { 
                    ({ choices } = await prompt([{
                        type: 'checkbox',
                        name: 'choices',
                        message: 'Choose his/her available days:',
                        choices: ['M', 'T', 'W', 'R', 'F']
                    }]));
                }
                else
                    break;
            }

            for (const choice of choices) {

                let time = "";


                let day = "";

                switch (choice) {
                    case 'M':
                        day += 'Monday';
                        break;
                    case 'T':
                        day += 'Tuesday';
                        break;
                    case 'W':
                        day += 'Wednesday';
                        break;
                    case 'R':
                        day += 'Thursday';
                        break;
                    case 'F':
                        day += 'Friday';
                        break;
                }

                time = day + " ";

                let timeSlot = undefined;

                do {
                    ({ timeSlot } = await prompt([{
                        type: 'input',
                        name: 'timeSlot',
                        message: `Enter time slot(s) for ${day}(e.g. 11:30AM - 1:30PM):`
                    }]));

                    if (timeSlot) {
                        if (timeSlot.split(" - ").length == 0) {
                            console.log("Triggered");

                            let split = timeSlot.split("-");
                            timeSlot = split[0].trim() + " - " + split[1].trim();
                        }

                        time += timeSlot + " ";
                    }

                } while (timeSlot);

                instructor.times.push(time.substring(0, time.length - 1));
            }

            let { confirm } = await prompt([{
                type: 'confirm',
                name: 'confirm',
                message: 'Is the above information correct?'
            }]);

            if (confirm)
                course.instructors.push(instructor);

            ({ instructorName } = await prompt([{
                type: 'input',
                name: 'instructorName',
                message: 'Enter the name of a TA/Professor with available office hours(or skip if done/none):'
            }]));
        }

        let { confirm } = await prompt([{
            type: 'confirm',
            name: 'confirm',
            message: 'Is the above information correct?'
        }]);
        
        if (confirm)
            courses.push(course);

        ({ courseName } = await prompt([{
            type: 'input',
            name: 'courseName',
            message: 'Enter course name(or hit enter if you\'re done):'
        }]));
    }

    // Write confirmation message later
    return courses;
}