export interface User{
    _id: number
    data: UserData
    file_name: string
    name: string
    time:string
}

export interface UserData{
    _id: string
    profile_url: string
    username: string
    firstname: string
    lastname: string
    full_name: string
    course_name: string
    file_name: string
    name: string
    time:string
    
}