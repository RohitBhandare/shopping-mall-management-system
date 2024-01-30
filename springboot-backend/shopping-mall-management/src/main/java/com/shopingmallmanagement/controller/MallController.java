package com.shopingmallmanagement.controller;

import com.shopingmallmanagement.entities.Mall;
import com.shopingmallmanagement.service.MallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping("/api/malls")
public class MallController {
    private final MallService mallService;

    @Autowired
    public MallController(MallService mallService) {
        this.mallService = mallService;
    }

    @GetMapping
    public ResponseEntity<List<Mall>> getAllMalls() {
        List<Mall> malls = mallService.getAllMalls();
        return new ResponseEntity<>(malls, HttpStatus.OK);
    }


    @GetMapping("/page")
    public Page<Mall> getAllMallsWithPaginationAndSorting(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        return mallService.getAllMallsWithPaginationAndSorting(page, size, sortBy, sortOrder);
    }


//    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public ResponseEntity<Flux<Mall>> getAllMalls() {
//        Flux<Mall> malls = mallService.getAllMallsReactively();
//        return new ResponseEntity<>(malls, HttpStatus.OK);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Mall> getMallById(@PathVariable Long id) {
        Mall mall = mallService.getMallById(id);
        return mall != null ? new ResponseEntity<>(mall, HttpStatus.OK)
                             : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Mall> createMall(@RequestBody Mall mall) {
        Mall createdMall = mallService.createMall(mall);
        return new ResponseEntity<>(createdMall, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mall> updateMall(@PathVariable Long id, @RequestBody Mall mall) {
        Mall updatedMall = mallService.updateMall(id, mall);
        return updatedMall != null ? new ResponseEntity<>(updatedMall, HttpStatus.OK)
                                   : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMall(@PathVariable Long id) {
        boolean deleted = mallService.deleteMall(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                       : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
