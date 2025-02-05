package com.ieum.service;

import com.ieum.domain.Msg;
import com.ieum.repository.MsgRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MsgService {

    private final MsgRepository msgRepository;

    public MsgService(MsgRepository msgRepository) {
        this.msgRepository = msgRepository;
    }

    // 메시지 리스트 가져오기
    public List<Msg> getMsgs(Long roomId) {
        return msgRepository.findMsgsByRoomId(roomId);
    }

    // 메시지 저장
    public Msg save(Msg msg) {
        return msgRepository.save(msg);
    }


}
