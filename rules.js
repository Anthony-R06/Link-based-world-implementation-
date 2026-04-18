class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
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
        }
    }

    handleChoice(choice) {
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


class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');