// BsktCompApiController.java
// 작성자 : 권영인

package com.dabeen.dnd.controller.api;

import javax.validation.Valid;

import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.BsktCompApiRequest;
import com.dabeen.dnd.model.network.response.BsktCompApiResponse;
import com.dabeen.dnd.model.pk.BsktCompPK;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;
import com.dabeen.dnd.service.api.BsktCompApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bskt-comp")
public class BsktCompApiController{

    @Autowired
    BsktCompApiService bsktCompApiService;

    @PostMapping("")
    public Header<BsktCompApiResponse> create(@RequestBody @Valid Header<BsktCompApiRequest> request){
        
        return bsktCompApiService.create(request);
    }

    @GetMapping("")
    public Header<BsktCompApiResponse> read(
        @RequestParam(name = "bskt_num") String bsktNum,
        @RequestParam(name = "help_num") String helpNum,
        @RequestParam(name = "suppl_num") String supplNum ){
            
        HelpSupplCompPK helpSupplCompPK = new HelpSupplCompPK(helpNum,supplNum);

        BsktCompPK bsktCompPK = new BsktCompPK(bsktNum, helpSupplCompPK);

        return bsktCompApiService.read(bsktCompPK);
    }

    @PutMapping("")
    public Header<BsktCompApiResponse> update(@RequestBody @Valid Header<BsktCompApiRequest> request){
        return bsktCompApiService.update(request);
    }

    @DeleteMapping("")
    public Header delete(
        @RequestParam(name = "bskt_num") String bsktNum,
        @RequestParam(name = "help_num") String helpNum,
        @RequestParam(name = "suppl_num") String supplNum){

        HelpSupplCompPK helpSupplCompPK = new HelpSupplCompPK(helpNum,supplNum);

        BsktCompPK bsktCompPK = new BsktCompPK(bsktNum, helpSupplCompPK);
    
        return bsktCompApiService.delete(bsktCompPK);
    }

}