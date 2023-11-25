package com.jose.coursescrud.controllers;

import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import com.jose.coursescrud.models.Course;
import com.jose.coursescrud.models.User;
import com.jose.coursescrud.services.userservice.UserService;
import com.jose.coursescrud.utils.request.SignupRequest;
import com.jose.coursescrud.utils.response.MessageResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// RESPONDE A PETICIONES DE OPERACIONES CRUD SOBRE LA ENTIDAD USER

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            userService.createUser(signUpRequest);
            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Error e) {
            return ResponseEntity.badRequest().body(e);
        }

    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> userList = userService.getAllUsers();
        return new ResponseEntity<List<User>>(userList, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        User user = userService.getUser(id);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/users/{id}/addCourse")
    public ResponseEntity<?> addCourseToUser(@PathVariable Long id, @RequestBody Course course) {
        userService.addCourseToUser(id, course);
        return ResponseEntity.ok(new MessageResponse("Course added!"));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new MessageResponse("User deleted!"));
    }

    @PatchMapping("/users/{id}/removeCourse")
    public ResponseEntity<?> deleteCourseToUser(@PathVariable Long id, @RequestBody Course course) {
        userService.DeleteCourseToUser(id, course);
        return ResponseEntity.ok(new MessageResponse("Course deleted!"));
    }

    @GetMapping("/users/{id}/courses")
    public ResponseEntity<?> getCoursesByUser(@PathVariable Long id) {
        Set<Course> courses = userService.getCoursesByUser(id);
        return new ResponseEntity<Set<Course>>(courses, HttpStatus.OK);
    }

}
