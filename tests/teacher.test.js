const request = require('supertest');
const app = require('../src/app');

describe('Teacher admin API test cases', () => {

    beforeAll(async () => {
    // seed data once before all tests
    await request(app)
      .post('/api/register')
      .send({ teacher: 'teacherken@gmail.com', students: ['studentjony@gmail.com', 'studentmary@gmail.com'] })
    });

    //Register api test 
    test('POST /api/register - Register students by teacher', async () => {
        const response = await request(app)
        .post('/api/register')
        .send({
            teacher: "teacherken@gmail.com",
            students: ["studentjon@gmail.com", "studenthon@gmail.com"]
        });
        expect(response.statusCode).toBe(204);
    });

    test('POST /api/register - should return 400 if teacher is missing', async () => {
    const res = await request(app)
        .post('/api/register')
        .send({ students: ['student@gmail.com'] })
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('message')
    });

    test('POST /api/register - should return 400 if students are missing', async () => {
    const res = await request(app)
        .post('/api/register')
        .send({ teacher: 'teacher@gmail.com' })
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('message')
    });

    // List of common students API
  test('GET /api/commonstudents - retrieve common students  to teachers', async () => {
    const res1 = await request(app)
      .get('/api/commonstudents')
      .query({ teacher: 'teacherken@gmail.com' });

    expect(res1.statusCode).toBe(200);
    expect(res1.body).toHaveProperty('students');
    expect(Array.isArray(res1.body.students)).toBe(true);
  });

  //Suspend the student API test
  test('POST /api/suspend - Should suspend a specified student', async () => {
    const response = await request(app)
      .post('/api/suspend')
      .send({
        student: "studentjony@gmail.com"
      });

    expect(response.statusCode).toBe(204);
  });
  
  test('POST /api/suspend - should return 404 if student does not exist', async () => {
    const res = await request(app)
        .post('/api/suspend')
        .send({ student: 'ghost@gmail.com' })
    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('message')
    });

  // Retrieve for Notifications api
  test('POST /api/retrievefornotifications - Should return correct recipients', async () => {
    const response = await request(app)
      .post('/api/retrievefornotifications')
      .send({
        teacher: "teacherken@gmail.com",
        notification: "Hello students! @studentagnes@gmail.com"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('recipients');
    // expect(response.body.recipients).toContain("studentagnes@gmail.com");
  });

});