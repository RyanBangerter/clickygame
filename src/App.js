import React, { Component } from 'react';
import './App.css';
import cartoons from './cartoon.json'
import Wrapper from './components/Wrapper'
import Score from './components/Score'
import Title from './components/Title'
import Cartooncard from './components/Cartooncard'

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        cartoons: cartoons,
        unselectedcartoons: cartoons
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectcartoon = character => {
        const findcartoon = this.state.unselectedcartoons.find(item => item.character === character);

        if(findcartoon === undefined) {
           
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                cartoons: cartoons,
                unselectedcartoons: cartoons
            });
        }
        else {
            
            const newcartoons = this.state.unselectedcartoons.filter(item => item.character !== character);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                cartoons: cartoons,
                unselectedcartoons: newcartoons
            });
        }

        this.shuffleArray(cartoons);
    };

    render() {
        return (
            <Wrapper>
                <Score
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.cartoons.map(cartoon => (
                        <Cartooncard
                            character={cartoon.character}
                            image={cartoon.image}
                            selectcartoon={this.selectcartoon} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;
