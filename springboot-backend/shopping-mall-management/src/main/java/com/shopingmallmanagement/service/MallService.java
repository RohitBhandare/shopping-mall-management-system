package com.shopingmallmanagement.service;

import com.shopingmallmanagement.entities.Mall;
import com.shopingmallmanagement.repository.MallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@Service
public class MallService {
    private final MallRepository mallRepository;

    @Autowired
    public MallService(MallRepository mallRepository) {
        this.mallRepository = mallRepository;
    }

    public List<Mall> getAllMalls() {
        return mallRepository.findAll();
    }

    // pagination and sorting
    public Page<Mall> getAllMallsWithPaginationAndSorting(int page, int size, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return mallRepository.findAll(pageable);
    }

    public Flux<Mall> getAllMallsReactively() {
        List<Mall> malls = mallRepository.findAll();
        return Flux.fromIterable(malls)
                .delayElements(Duration.ofSeconds(1)); // Adjust the delay duration as needed
    }

    public Mall getMallById(Long id) {
        return mallRepository.findById(id).orElse(null);
    }

    public Mall createMall(Mall mall) {
        return mallRepository.save(mall);
    }

    public Mall updateMall(Long id, Mall updatedMall) {
        if (mallRepository.existsById(id)) {
            updatedMall.setId(id);
            return mallRepository.save(updatedMall);
        }
        return null;
    }

    public boolean deleteMall(Long id) {
        if (mallRepository.existsById(id)) {
            mallRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
