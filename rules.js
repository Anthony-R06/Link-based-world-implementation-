class Start extends Scene {
    create() {
<<<<<<< HEAD
        this.engine.setTitle("Title goes here"); // TODO: replace this text using this.engine.storyData to find the story title
=======
        this.engine.setTitle(this.engine.storyData.Title);
>>>>>>> master
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
<<<<<<< HEAD
        this.engine.gotoScene(Location, "Home"); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = undefined; // TODO: use `key` to get the data object for the current story location
        this.engine.show("Body text goes here"); // TODO: replace this text by the Body of the location data
        
        if(true) { // TODO: check if the location has any Choices
            for(let choice of ["example data"]) { // TODO: loop over the location's Choices
                this.engine.addChoice("action text"); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
=======
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); 
    }
}

let knowsPin = false;
let hasStarKey = false;
let hasExitKey = false;

class Location extends Scene {
    create(locationKey) {
        let locationData = this.engine.storyData.Locations[locationKey];
        this.engine.show(locationData.Body);

        if (locationData.Choices && locationData.Choices.length > 0) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.");
>>>>>>> master
        }
    }

    handleChoice(choice) {
<<<<<<< HEAD
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

=======
        if (!choice) {
            this.engine.gotoScene(End);
            return;
        }

        this.engine.show("&gt; " + choice.Text);

        if ((choice.Text == "Exit") && !hasExitKey) {
            this.engine.show("The entrance is locked. There must be a key somewhere.");
            this.engine.gotoScene(Location, "Lby");
            return;
        }

        if (choice.Target == "R1") {
            knowsPin = true;
        }

        if (choice.Target == "R2") {
            if (knowsPin == false) {
                this.engine.show("The safe is locked. Maybe there is a clue somewhere.");
                this.engine.gotoScene(Location, "R2");
                return;
            } else if (hasStarKey == false) {
                this.engine.show("You use the room number clue from the 1st floor as the pin and open the safe.");
                this.engine.show("Inside you find a star-shaped key.");
                hasStarKey = true;
                this.engine.gotoScene(Location, "R2");
                return;
            }
        }

        if (choice.Target == "R3") {
            if (hasStarKey == false) {
                this.engine.show("The safe has a star-shaped keyhole. You need to find the right key.");
                this.engine.gotoScene(Location, "R3");
                return;
            } else if (hasExitKey == false) {
                this.engine.show("You unlock the safe with the star-shaped key.");
                this.engine.show("Inside you find the hotel exit key.");
                hasExitKey = true;
                this.engine.gotoScene(Location, "R3");
                return;
            }
        }

        this.engine.gotoScene(Location, choice.Target);
    }
}


>>>>>>> master
class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');