// CategoryApiService.java
// 작성자 : 권영인


package com.dabeen.dnd.service.api;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Category;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.CategoryApiRequest;
import com.dabeen.dnd.model.network.response.CategoryApiResponse;
import com.dabeen.dnd.service.BaseService;

public class CategoryApiService extends BaseService<CategoryApiRequest, CategoryApiResponse, Category> {

    @Override
    public Header<CategoryApiResponse> create(Header<CategoryApiRequest> request) {
        // TODO Auto-generated method stub
        CategoryApiRequest categoryApiRequest = request.getData();

        Category category = Category.builder().catName(categoryApiRequest.getCatName())
                                                .catDesc(categoryApiRequest.getCatDesc())
                                                .highCatNum(categoryApiRequest.getHighCatNum()).build();
        
        Category newCategory = baseRepository.save(category);
        
        return Header.OK(response(newCategory));    }

    @Override
    public Header<CategoryApiResponse> read(String num) {
        // TODO Auto-generated method stub
        
        return baseRepository.findById(num).map(category -> response(category)).map(category -> Header.OK(category)).orElseThrow(() -> new NotFoundException("category"));

    }

    @Override
    public Header<CategoryApiResponse> update(Header<CategoryApiRequest> request) {
        // TODO Auto-generated method stub
        
        CategoryApiRequest categoryApiRequest = request.getData();

        return baseRepository.findById(categoryApiRequest.getCatNum()).map(category -> category.setCatNum(categoryApiRequest.getCatNum())
                                                                                                .setCatName(categoryApiRequest.getCatName())
                                                                                                .setCatDesc(categoryApiRequest.getCatDesc())
                                                                                                .setHighCatNum(categoryApiRequest.getHighCatNum()))
                                                                                    .map(
                                                                                        newCategory -> baseRepository.save(newCategory)
                                                                                    ).map(
                                                                                        c -> Header.OK(response(c))
                                                                                    ).orElseThrow(() -> new NotFoundException("Category"));
        
    }

    @Override
    public Header delete(String num) {
        // TODO Auto-generated method stub
        return baseRepository.findById(num).map(category -> {
            baseRepository.delete(category);
            return Header.OK();
            }).orElseThrow( () -> new NotFoundException("Category"));
    }


    public CategoryApiResponse response(Category category){

        CategoryApiResponse categoryApiResponse = CategoryApiResponse.builder()
                                                                        .catNum(category.getCatNum())
                                                                        .catName(category.getCatName())
                                                                        .catDesc(category.getCatDesc())
                                                                        .highCatNum(category.getHighCatNum()).build();
        
        return categoryApiResponse;

    }


}