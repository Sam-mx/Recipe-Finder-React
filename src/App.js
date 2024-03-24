import { useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { withStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Header from './Components/HeaderComponents'
import Recipe from './Components/RecipeComponent'

const APP_ID = "dff4343c";
const APP_KEY = "84405d3e889224e04c9f240da917ae11";
// https://www.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}

const Container = styled.div`
display:flex;
flex-direction: column;
`;

// styling of table using material-ui
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


//  placeholder component

const Placeholder = styled.img`
width : 350px;
height : 350px;
margin: 100px;
opacity: 50%;
`;

// recipeComponent
const RecipeComponent = (props) => {

  const mystyle = {
    width: "60px",
    height: "60px"
  };

  const [seeIngredients, setSeeIngredients] = useState(false);  //dialog
  const { recipeObj } = props;

  const handleSeeIngredients = () => {
    setSeeIngredients(true);
  }

  const handleCloseIngredients = () => {
    setSeeIngredients(false);
  }
  return (
    <>
      <Dialog open={seeIngredients} onClose={handleCloseIngredients}>
        <DialogTitle id="alert-dialog-slide-title">Ingredients List</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell align="right">Food Category</StyledTableCell>
                <StyledTableCell align="right">Ingredients</StyledTableCell>
                <StyledTableCell align="right">Weight</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipeObj.ingredients.map((ingredientObj) =>
                <TableRow key={ingredientObj.text}>
                  <StyledTableCell><img src={ingredientObj.image} alt={ingredientObj.foodCategory} style={mystyle} /></StyledTableCell>
                  <StyledTableCell>{ingredientObj.foodCategory}</StyledTableCell>
                  <StyledTableCell>{ingredientObj.text}</StyledTableCell>
                  <StyledTableCell>{ingredientObj.weight}</StyledTableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>

          <Recipe.IngredientsText onClick={() => window.open(recipeObj.url)}>See More</Recipe.IngredientsText>
          <Recipe.SeeMoreText onClick={handleCloseIngredients}>Close</Recipe.SeeMoreText>

        </DialogActions>
      </Dialog>

      <Recipe.RecipeContainer>
        <Recipe.CoverImage src={recipeObj.image} />
        <Recipe.RecipeName>{recipeObj.label}</Recipe.RecipeName>
        <Recipe.IngredientsText onClick={handleSeeIngredients}>Ingredients</Recipe.IngredientsText>
        <Recipe.SeeMoreText onClick={() => window.open(recipeObj.url)} >See Complete Recipe</Recipe.SeeMoreText>
      </Recipe.RecipeContainer>
    </>
  )
}


function App() {

  const [timeoutId, updateTimeoutID] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://www.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
     console.log(response);
    updateRecipeList(response.data.hits);
  }

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 800);
    updateTimeoutID(timeout);

  }

  return (
    <Container>
      <Header.HeaderComponent>
        <Header.AppNameComponent>
          <Header.AppIcon src="/logo.png" />
          Recipe Finder
        </Header.AppNameComponent>
        <Header.SearchComponent>
          <Header.SearchImage src="/search-icon.svg" />
          <Header.SearchInput placeholder="Search Recipe" onChange={onTextChange} />
        </Header.SearchComponent>
      </Header.HeaderComponent>

      <Recipe.RecipeListContainer>
  {recipeList.length ? recipeList.map((recipeObject, index) => (
    <RecipeComponent key={index} recipeObj={recipeObject.recipe} />
  )
  ) : <Placeholder src="/recipe.png" />}
</Recipe.RecipeListContainer>


    </Container>
  );
}

export default App;