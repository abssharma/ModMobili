import unittest
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):

# ================================ setup ================================    
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)

        with self.app.app_context():
            db.create_all()
# ================================ test hello world ================================
    def test_hello_world(self):
        hello_response = self.client.get('/mod/hello')
        json = hello_response.json
        #print(json)
        self.assertEqual(json, {"message": "Hello World"})
# ================================ test signup ================================
    def test_signup(self):
        signup_response = self.client.post('/auth/signup',
            json={"username": "testuser", 
                  "email": "testuser@test.com", 
                  "password": "password"}
        ) 
        status_code = signup_response.status_code
        self.assertEqual(status_code, 201)
# ================================ test login ================================
    def test_login(self):
        signup_response = self.client.post('/auth/signup',
            json={"username": "testuser", 
                  "email": "testuser@test.com", 
                  "password": "password"}
        ) 
        login_response = self.client.post('/auth/login',
            json={"username": "testuser", 
                  "password": "password"}
        )
        status_code = login_response.status_code
        json = login_response.json
        #print(json)
        self.assertEqual(status_code, 200)
# ================================ test get all mods ================================ 
    def test_get_all_mods(self):
        response = self.client.get('/mod/mods')
        #print(response.json)
        status_code = response.status_code
        self.assertEqual(status_code, 200)
# ================================ test get one mod ================================ 
    def test_get_one_mod(self):
        id = 1
        response = self.client.get(f'/mod/mod/{id}')
        status_code = response.status_code
        #print(status_code)
        self.assertEqual(status_code, 404)
# ================================ test create mod ================================ 
    def test_create_mod(self):
        signup_response = self.client.post('/auth/signup',
            json={"username": "testuser", 
                  "email": "testuser@test.com", 
                  "password": "password"}
        ) 
        login_response = self.client.post('/auth/login',
            json={"username": "testuser", 
                  "password": "password"}
        )

        access_token = login_response.json["access_token"]

        create_mod_response = self.client.post('/mod/mods',
            json = {
                "title": "Test Car",
                "description": "Test Car Description"
            },
            headers = {
                "Authorization": f"Bearer {access_token}"
            } 
        )
        status_code = create_mod_response.status_code
        #print(create_mod_response.json)
        self.assertEqual(status_code, 201)
# ================================ test update mod ================================ 
    def test_update_mod(self):
        signup_response = self.client.post('/auth/signup',
            json={"username": "testuser", 
                  "email": "testuser@test.com", 
                  "password": "password"}
        ) 
        login_response = self.client.post('/auth/login',
            json={"username": "testuser", 
                  "password": "password"}
        )

        access_token = login_response.json["access_token"]

        create_mod_response = self.client.post('/mod/mods',
            json = {
                "title": "Test Car",
                "description": "Test Car Description"
            },
            headers = {
                "Authorization": f"Bearer {access_token}"
            } 
        )
        status_code = create_mod_response.status_code

        id = 1
        update_response = self.client.put(f'/mod/mod/{id}',
            json = {
                "title": "Test Car Updated",
                "description": "Test Car Description Updated"
            },
            headers = {
                "Authorization": f"Bearer {access_token}"
            }
        )
        status_code = update_response.status_code
        self.assertEqual(status_code, 200)
# ================================ test delete mod ================================ 
    def test_delete_mod(self):
        signup_response = self.client.post('/auth/signup',
            json={"username": "testuser", 
                  "email": "testuser@test.com", 
                  "password": "password"}
        ) 
        login_response = self.client.post('/auth/login',
            json={"username": "testuser", 
                  "password": "password"}
        )

        access_token = login_response.json["access_token"]

        create_mod_response = self.client.post('/mod/mods',
            json = {
                "title": "Test Car",
                "description": "Test Car Description"
            },
            headers = {
                "Authorization": f"Bearer {access_token}"
            } 
        )

        id = 1
        delete_response = self.client.delete(f'/mod/mod/{id}',
            headers = {
                "Authorization": f"Bearer {access_token}"
            }
        )
        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)

# ================================ teardown ================================
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == "__main__":
    unittest.main()
