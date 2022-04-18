package com.esig.kanban.Model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

@Entity(name = "users")
@Data
@SQLDelete(sql = "UPDATE users SET deleted = true, deleted_at = NOW() WHERE id=?")
@Where(clause = "deleted=false")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@JsonProperty(value = "id")
	private long id;

    @Column(name = "username", unique = true, nullable = false)
	@JsonProperty(value = "username")
    private String username;

    @Column(name = "password", nullable = false)
	@JsonProperty(value = "password", access = Access.WRITE_ONLY)
    private String password;

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;

    @Column(name = "deleted", nullable = false)
	private boolean deleted = false;

}
