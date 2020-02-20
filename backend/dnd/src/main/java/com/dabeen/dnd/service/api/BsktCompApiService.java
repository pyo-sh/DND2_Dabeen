// BsktCompApiService.java
// 작성자 : 권영인

package com.dabeen.dnd.service.api;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.BsktComp;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.BsktCompApiRequest;
import com.dabeen.dnd.model.network.response.BsktCompApiResponse;
import com.dabeen.dnd.model.pk.BsktCompPK;
import com.dabeen.dnd.repository.BsktCompRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class BsktCompApiService{

    @Autowired
    BsktCompRepository bsktCompRepository;

    public Header<BsktCompApiResponse> create(Header<BsktCompApiRequest> request){
        BsktCompApiRequest bsktCompApiRequest = request.getData();

        BsktCompPK bsktCompPK = new BsktCompPK(bsktCompApiRequest.getBsktNum(), bsktCompApiRequest.getHelpNum(), bsktCompApiRequest.getSupplNum());

        BsktComp bsktComp = BsktComp.builder()
                                    .bsktCompPK(bsktCompPK)
                                    .indvHelpPrice(bsktCompApiRequest.getIndvHelpPrice()).build();
    
        BsktComp newBsktComp = bsktCompRepository.save(bsktComp);

        return Header.OK(response(newBsktComp));
    }

    public Header<BsktCompApiResponse> read(BsktCompPK bsktCompPK){

        return bsktCompRepository.findById(bsktCompPK).map(
            bsktComp -> Header.OK(response(bsktComp))
        ).orElseThrow(()->new NotFoundException("BsktComp"));

    }

    public Header<BsktCompApiResponse> update(Header<BsktCompApiRequest> request){

        BsktCompApiRequest bsktCompApiRequest = request.getData();

        BsktCompPK bsktCompPK = new BsktCompPK(bsktCompApiRequest.getBsktNum(), bsktCompApiRequest.getHelpNum(),bsktCompApiRequest.getSupplNum());

        return bsktCompRepository.findById(bsktCompPK).map(bsktComp -> bsktComp.setIndvHelpPrice(bsktCompApiRequest.getIndvHelpPrice()))
                                                .map(newBsktComp -> bsktCompRepository.save(newBsktComp))
                                                .map(bc -> Header.OK(response(bc)))
                                                .orElseThrow(() -> new NotFoundException("BsktComp"));

    }

    public Header delete(BsktCompPK bsktCompPK){
        
        return bsktCompRepository.findById(bsktCompPK)
                            .map(bsktComp -> {
                                bsktCompRepository.delete(bsktComp);
                                return Header.OK();
        }).orElseThrow(() -> new NotFoundException("BsktComp"));

    }

    public BsktCompApiResponse response(BsktComp bsktComp){

        BsktCompApiResponse bsktCompApiResponse = BsktCompApiResponse.builder()
                                                                    .bsktNum(bsktComp.getBsktCompPK().getBsktNum())
                                                                    .helpNum(bsktComp.getBsktCompPK().getHelpNum())
                                                                    .supplNum(bsktComp.getBsktCompPK().getSupplNum())
                                                                    .indvHelpPrice(bsktComp.getIndvHelpPrice()).build();

        return bsktCompApiResponse;
    }
}