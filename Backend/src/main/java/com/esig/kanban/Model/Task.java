package com.esig.kanban.Model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Entity(name = "task")
@SQLDelete(sql = "UPDATE task SET deleted = true, deleted_at = UTC_TIMESTAMP() WHERE id=?")
@Where(clause = "deleted=false")
public class Task {

	@Id

	@GeneratedValue
	private long id;


	@Column(name = "title")
	@JsonProperty(value = "title")
	private String title;


	@Column(name = "description", columnDefinition = "TEXT")
	@JsonProperty(value = "description")
	private String description;


	@Column(name = "deadline")
	@JsonProperty(value = "deadline")
	private LocalDate deadline;


	@Column(name = "priority")
	@JsonProperty(value = "priority")
	private Priority priority;


	@ManyToOne
	@JoinColumn(name="user_id")
	@JsonProperty(value = "user")
	private User user;


	@CreationTimestamp
	@Column(name = "created_at")
	@JsonProperty(value = "created_at")
	private LocalDateTime createdAt;


	@UpdateTimestamp
	@Column(name = "updated_at")
	@JsonProperty(value = "updated_at")
	private LocalDateTime updatedAt;


	@Column(name = "concluded_at")
	@JsonProperty(value = "concluded_at")
	private LocalDateTime concludedAt;


	@Column(name = "deleted_at")
	@JsonProperty(value = "deleted_at")
	private LocalDateTime deletedAt;

    @Column(name = "deleted", nullable = false)
	private boolean deleted = false;


	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	@JsonProperty(value = "status")
	private Status status;

	@PrePersist
	@PreUpdate
	private void prePersist() {
		if (Status.DONE.equals(status)) {
			concludedAt = LocalDateTime.now();
		}
	}
}
