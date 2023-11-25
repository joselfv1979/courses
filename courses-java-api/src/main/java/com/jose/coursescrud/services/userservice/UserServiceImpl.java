package com.jose.coursescrud.services.userservice;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.jose.coursescrud.models.Course;
import com.jose.coursescrud.models.Role;
import com.jose.coursescrud.models.User;
import com.jose.coursescrud.models.ERole;
import com.jose.coursescrud.repositories.RoleRepository;
import com.jose.coursescrud.repositories.UserRepository;
import com.jose.coursescrud.utils.request.SignupRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;

// CONTIENE LAS OPERACIONES A REALIZAR SOBRE LOS USUARIOS
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Override
	public List<User> getAllUsers() {
		List<User> userList = userRepository.findAll();
		return userList;
	}

	@Override
	public User getUser(Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		User user = userOptional.get();
		return user;
	}

	@Override
	public void addCourseToUser(Long id, Course course) {
		Optional<User> userOptional = userRepository.findById(id);
		User user = userOptional.get();
		user.addCourse(course);
		userRepository.save(user);
	}

	@Override
	public void deleteUser(Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		User user = userOptional.get();
		userRepository.delete(user);
	}

	@Override
	public void DeleteCourseToUser(Long id, Course course) {
		Optional<User> userOptional = userRepository.findById(id);
		User user = userOptional.get();
		Set<Course> courses = user.getCourses();

		if (courses.contains(course)) {
			courses.remove(course);
		} else {
			System.out.println("No está");
		}
		user.setCourses(courses);
		userRepository.save(user);
	}

	@Override
	public Set<Course> getCoursesByUser(Long id) {
		Optional<User> userOptional = userRepository.findById(id);

		if (userOptional.isPresent()) {
			User user = userOptional.get();
			Set<Course> courses = user.getCourses();
			return courses;
		} else {
			System.out.println("No existe");
			return null;
		}

	}

	@Override
	public Boolean createUser(SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			throw new Error(("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			throw new Error("Error: Email is already in use!");
		}

		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
					case "admin":
						Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(adminRole);

						break;
					case "mod":
						Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(modRole);

						break;
					default:
						Role userRole = roleRepository.findByName(ERole.ROLE_USER)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return true;

	}
    
}
