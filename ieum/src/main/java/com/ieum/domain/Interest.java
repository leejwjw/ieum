package com.ieum.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Interest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "INTEREST_ID")
    private Long interestId;

    private String name;

    private String icon;

    @OneToMany(mappedBy = "interest", cascade = CascadeType.ALL)
    private List<UserInterest> userInterests = new ArrayList<>();
}
