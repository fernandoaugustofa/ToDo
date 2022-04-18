package com.esig.kanban.Controller;

import java.util.List;
import java.util.Optional;

import com.esig.kanban.Model.JwtResponse;
import com.esig.kanban.Util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.esig.kanban.Model.User;
import com.esig.kanban.Service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired 
	private UserService userService;
	
	@PostMapping(consumes = "application/json", produces = "application/json")
	public @ResponseBody User Create(@RequestBody User user) {
        System.out.println(user);
	    user = userService.save(user);
	    return user;
	}
	
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable Long id) {
	    userService.delete(id);
	}

	@GetMapping(value = "/{id}",produces = "application/json")
    public ResponseEntity<Optional<User>> Find(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

	@PutMapping(value = "/{id}",produces = "application/json")
    public ResponseEntity<Optional<User>> Update(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
	
	@GetMapping(produces = "application/json")
    public ResponseEntity<List<User>> List() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody User user) throws Exception {

		authenticate(user.getUsername(), user.getPassword());

		final UserDetails userDetails = userService.loadUserByUsername(user.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
