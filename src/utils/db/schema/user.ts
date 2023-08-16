export const userSchema = {
    title: 'user schema',
    description: 'logged in user',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        username: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        instituteCode: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        studentId: {
            type: 'string'
        },
        role: {
            type: 'string'
        },
        nickname: {
            type: 'string'
        },
        picture: {
            type: 'string'
        },
    },
    required: [
        'id',
        'username',
        'password',
        'instituteCode',
        'name',
        'student_id',
        'role',
    ],
};