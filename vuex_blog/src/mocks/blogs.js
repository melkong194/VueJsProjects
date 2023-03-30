import faker from 'faker';

var listBlogs=[];

for (var index = 0; index < 5; index ++){
    let data = {
        id: Math.round(Math.random() * 999999999),
        title: faker.lorem.paragraph(1),
        abstract: faker.lorem.paragraph(2),
        fullName: faker.name.firstName() + ' '+ faker.name.lastName(),
        create_at: faker.date.past()
    }
    listBlogs.push(data);
}

export default listBlogs;