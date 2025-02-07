package com.ieum.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class PapagoTranslationService {

    private static final String CLIENT_ID = "b54ba3w4qn"; // 네이버 클라우드에서 발급받은 클라이언트 아이디
    private static final String CLIENT_SECRET = "uKg62zpM6sxCJX7WysWAO74zZ0VDuHZupBYOBf0k"; // 네이버 클라우드에서 발급받은 클라이언트 시크릿

    public String translateText(String text, String targetLanguage) {
        // 자동으로 텍스트의 언어를 감지하도록 설정
        String sourceLanguage = "auto";  // 자동 언어 감지

        // 동일한 언어로 번역하지 않도록, target 언어와 source 언어가 다르게 설정
        log.info("------sourceLanguage {} :",sourceLanguage);
        log.info("------targetLanguage {} :",targetLanguage);

        if (sourceLanguage.equals(targetLanguage)) {
            return "Error: source and target languages cannot be the same.";
        }

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-NCP-APIGW-API-KEY-ID", CLIENT_ID);  // 네이버 API 키 ID
        headers.set("X-NCP-APIGW-API-KEY", CLIENT_SECRET); // 네이버 API 키 SECRET

        Map<String, String> body = new HashMap<>();
        body.put("source", sourceLanguage); // 자동 감지
        body.put("target", targetLanguage); // 번역할 언어
        body.put("text", text);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        // API 호출 URL
        String apiUrl = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation";
        ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, Map.class);

        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("message")) {
            Map<String, Object> message = (Map<String, Object>) responseBody.get("message");
            if (message != null && message.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) message.get("result");
                if (result != null && result.containsKey("translatedText")) {
                    return (String) result.get("translatedText");
                }
            }
        }

        return "Translation failed";
    }
}
