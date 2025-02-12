package com.ieum.dto;

import lombok.Data;
import org.springframework.core.io.Resource;

@Data
public class ProfileImageDTO {
    private byte[] data;
    private String contentType;

    public ProfileImageDTO() {
    } // 기본 생성자 추가

    public ProfileImageDTO(byte[] data, String contentType) {
        this.data = data;
        this.contentType = contentType;
    }
}

