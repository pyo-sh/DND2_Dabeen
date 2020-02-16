package com.dabeen.dnd.repository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import static org.hamcrest.core.Is.is;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Category;
import com.dabeen.dnd.repository.CategoryRepository;

import org.junit.Before;    
    
@RunWith(SpringRunner.class)
@SpringBootTest
public class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Before
    public void setup(){

    }
        
    @Test
    public void create() {
        
        String catNum = "1000";
        String catName = "1 카테고리";
        String catDesc = "설명";
        String highCatNum = null;

        Category category = Category.builder()
                                    .catNum(catNum)
                                    .catName(catName)
                                    .catDesc(catDesc)
                                    .highCatNum(highCatNum).build();

        Category newCategory= categoryRepository.save(category);

        assertThat(newCategory.getCatNum(),is("1000"));

    }

    
    @Test
    public void read() {
        
        String catNum = "1000";

        assertNotNull(categoryRepository.findById(catNum));
    }

    
    @Test
    public void update() {
        
        String catNum = "1000";

        Optional<Category> category = categoryRepository.findById(catNum);
        
        category.ifPresent(selectedCat -> {
            selectedCat.setCatDesc("Modified Desc");
            categoryRepository.save(selectedCat);
        });
        
    }

    
    @Test
    @Transactional
    public void delete() {
     
        String catNum = "1000";

        Optional<Category> category = categoryRepository.findById(catNum);

        assertNotNull(category.isPresent());

        category.ifPresent(selectedCat -> {
            categoryRepository.delete(selectedCat);
        });

        Optional<Category> deleteCategory = categoryRepository.findById(catNum);

        assertNotNull(deleteCategory.isPresent());

    }
}
    