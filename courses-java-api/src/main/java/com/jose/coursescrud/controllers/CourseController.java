package com.jose.coursescrud.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jose.coursescrud.models.Course;
import com.jose.coursescrud.models.User;
import com.jose.coursescrud.services.courseservice.CourseService;
import com.jose.coursescrud.utils.response.MessageResponse;

// RESPONDE A PETICIONES DE OPERACIONES CRUD SOBRE LA ENTIDAD COURSE

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/auth")
public class CourseController {

	@Autowired
	private CourseService courseService;

	@GetMapping("/courses{parameters}")
	public ResponseEntity<?> getCourses(@RequestParam HashMap<String, Object> allParams) {
		List<Course> courses = courseService.getFilteredCourses(allParams);
		return new ResponseEntity<List<Course>>(courses, HttpStatus.OK);
	}

	@GetMapping("/courses/{id}/users")
	public ResponseEntity<?> getUsersByCourse(@PathVariable int id) {
		Set<User> userList = courseService.getUsersByCourse(id);
		return new ResponseEntity<Set<User>>(userList, HttpStatus.OK);
	}

	@PostMapping("/courses/{id}/users")
	public ResponseEntity<?> addUsersToCourse(@PathVariable int id, @RequestBody String username) {
		Course courseUpdated = courseService.addUsersToCourse(id, username);
		return new ResponseEntity<Course>(courseUpdated, HttpStatus.OK);
	}

	@GetMapping("/courses/{id}")
	public ResponseEntity<?> getCourse(@PathVariable int id) {
		Course course = courseService.getCourse(id);
		return new ResponseEntity<Course>(course, HttpStatus.OK);
	}

	@PutMapping("/courses/{id}")
	public ResponseEntity<Course> updateCourse(@PathVariable int id, @RequestBody Course course) {
		Course courseUpdated = courseService.updateCourse(course);
		return new ResponseEntity<Course>(courseUpdated, HttpStatus.OK);
	}

	@PostMapping("/courses")
	public ResponseEntity<?> createCourse(@RequestBody Course course) {

		if (courseService.existsByDescription(course.getDescription())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: The course already exists"));
		}

		Course createdCourse = courseService.createCourse(course);

		return new ResponseEntity<Course>(createdCourse, HttpStatus.OK);
	}

	@DeleteMapping("/courses/{id}")
	public ResponseEntity<?> deleteCourse(@PathVariable int id) {
		courseService.deleteCourse(id);
		return ResponseEntity.ok(new MessageResponse("Course "+id+"deleted!"));
	}

}
