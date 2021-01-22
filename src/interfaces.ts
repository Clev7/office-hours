export interface Course {
    course: string,

    // Lists available Instructors
    instructors?: Array<Instructor> | 'Not Available',
    "class link"?: string
}

export interface Instructor {
    name: string,
    email?: string,
    times: Array<string>,
    "zoom link"?: string
}