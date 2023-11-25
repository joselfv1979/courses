// CLASE QUE REPRESENTA LA ENTIDAD COURSE Y SU CORRESPONDIENTE TABLA EN LA BD
package com.jose.coursescrud.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "courses")
public class Course {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "language")
	private String language;

	@Column(name = "format")
	private String format;

	@Column(name = "price")
	private float price;

	@Column(name = "description")
	private String description;

	@ManyToMany(mappedBy = "courses")
	@JsonIgnoreProperties("courses")
    private Set<User> users = new HashSet<>();
    
    public Course() {
	super();
	}

	public Course(int id, String language, String format, float price, String
	description) {
	super();
	this.id = id;
	this.language = language;
	this.format = format;
	this.price = price;
	this.description = description;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getFormat() {
		return format;
	}

	public void setType(String format) {
		this.format = format;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public void addUser(User user) {
		if (this.users == null) {
			this.users = new HashSet<>();
		}

		this.users.add(user);
		user.getCourses().add(this);
	}

	public void removeUser(User user) {
		this.users.remove(user);
		user.getCourses().remove(this);
	}

	@Override
	public String toString() {
		return "Course [id=" + id + ", language=" + language + ", format=" + format + ", price=" + price + ", description="
				+ description + "]";
	}

	public Course(Set<User> users) {
		this.users = users;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + id;
		result = prime * result + ((language == null) ? 0 : language.hashCode());
		result = prime * result + Float.floatToIntBits(price);
		result = prime * result + ((format == null) ? 0 : format.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Course other = (Course) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (id != other.id)
			return false;
		if (language == null) {
			if (other.language != null)
				return false;
		} else if (!language.equals(other.language))
			return false;
		if (Float.floatToIntBits(price) != Float.floatToIntBits(other.price))
			return false;
		if (format == null) {
			if (other.format != null)
				return false;
		} else if (!format.equals(other.format))
			return false;
		return true;
	}
}
