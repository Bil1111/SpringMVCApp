package com.example.config.ip;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ipinfo")
public class IpInfoController {

    @Autowired
    private  IpInfoService ipInfoService;

    @GetMapping
    public Map<String, Object> getIpInfo(HttpServletRequest request) {
        return ipInfoService.getIpInfo(request);
    }

    @GetMapping("/{ip}")
    public Map<String, Object> getIpInfo(@PathVariable String ip) {
        return ipInfoService.getIpInfo(ip);
    }
}