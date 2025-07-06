package com.secureX.SecureX.controller;


import com.secureX.SecureX.Entity.Leaderboard;
import com.secureX.SecureX.repository.LeaderboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.InputStreamResource;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    @Autowired
    private LeaderboardRepository leaderboardRepository;

    @GetMapping("/leaderboard")
    public List<Leaderboard> getLeaderboard() {
        return leaderboardRepository.findAll();
    }

    // Streaming video feed as multipart/x-mixed-replace
    @GetMapping(value = "/video_feed", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] streamVideo() {
        // We'll replace this with a bridge to OpenCV later
        return new byte[0]; // placeholder
    }
}

