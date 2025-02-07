//package com.ieum.domain;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//@Getter
//@Setter
//@ToString
//public class Interest {
//    @Id
//    private Long INTEREST_ID;
//
//    private String NAME;
//    private String ICON;
//
//    @OneToMany(mappedBy = "interest", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<UserInterest> userInterests = new ArrayList<>();
//}
