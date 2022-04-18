package com.esig.kanban.Controller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.esig.kanban.Model.Task;
import com.esig.kanban.Service.TaskService;

@RestController
@RequestMapping("/task")
public class TaskController {
	
	@Autowired 
	private TaskService taskService;

	@PostMapping(consumes = "application/json", produces = "application/json")
	public @ResponseBody Task Create(@RequestBody Task task) {
	    task = taskService.save(task);
	    return task;
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
	    taskService.delete(id);
	}

	@GetMapping(value = "/{id}",produces = "application/json")
    public ResponseEntity<Optional<Task>> Find(@PathVariable Long id) {
        Optional<Task> task = taskService.findById(id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping(produces = "application/json")
    public @ResponseBody Task Update(@RequestBody Task task) {
        task = taskService.save(task);
	    return task;
    }

	@GetMapping(value="/search",produces = "application/json")
    public ResponseEntity<Optional<Task>> Search(@RequestParam long id, @RequestParam String title, @RequestParam String user, @RequestParam String deadline, @RequestParam String priority) {
		Optional<Task> task = taskService.findById(id);
        // List<Task> tasks = taskService.Search(title);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }
	
	@GetMapping(produces = "application/json")
    public ResponseEntity<List<Task>> List() {
        List<Task> tasks = taskService.findAll();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
}
