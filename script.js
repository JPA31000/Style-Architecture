document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('imageContainer');
    const buildingDescriptionsList = document.getElementById('buildingDescriptionsList');
    const submitButton = document.getElementById('submitButton');
    const resultsArea = document.getElementById('resultsArea');

    const architecturalStyles = {
        1: "Art Déco",
        2: "Architecture Organique / Paramétrique",
        3: "Architecture High-tech",
        4: "Style Paquebot (Streamline Moderne)",
        5: "Gothique",
        6: "Baroque",
        7: "Bauhaus",
        8: "Brutalisme"
    };

    // IMPORTANT : Ajustez les valeurs 'top' et 'left' dans 'position' 
    // pour que chaque case et son label se placent correctement sur VOTRE image.
    // Les labels sont positionnés légèrement à gauche de la case.
    const buildings = [
        {
            id: "b1_input", // ID unique pour l'input
            labelNumber: "1", // Numéro affiché sur l'image
            description: "Bâtiment à l'extrême gauche avec des formes courbes et une cascade.",
            correctAnswer: 2, // Architecture Organique / Paramétrique
            // Position de la CASE D'INPUT. Le label sera à sa gauche.
            position: { top: "70%", left: "12%" } 
        },
        {
            id: "b2_input",
            labelNumber: "2",
            description: "Grand bâtiment central gauche avec structure métallique et tuyaux externes.",
            correctAnswer: 3, // Architecture High-tech
            position: { top: "75%", left: "38%" }
        },
        {
            id: "b3_input",
            labelNumber: "3",
            description: "Bâtiment central droit avec des façades et fenêtres arrondies.",
            correctAnswer: 4, // Style Paquebot (Streamline Moderne)
            position: { top: "75%", left: "63%" }
        },
        {
            id: "b4_input",
            labelNumber: "4",
            description: "Bâtiment à l'extrême droite avec une flèche distinctive.",
            correctAnswer: 1, // Art Déco
            position: { top: "65%", left: "88%" } 
        }
    ];

    function setupGame() {
        buildings.forEach(building => {
            // Créer la case d'input sur l'image
            const inputElement = document.createElement('input');
            inputElement.type = "number";
            inputElement.id = building.id;
            inputElement.classList.add('building-input-on-image');
            inputElement.min = "1";
            inputElement.max = Object.keys(architecturalStyles).length.toString();
            inputElement.style.top = building.position.top;
            inputElement.style.left = building.position.left;
            imageContainer.appendChild(inputElement);

            // Créer le label numérique à côté de la case
            const labelElement = document.createElement('span');
            labelElement.classList.add('building-label-on-image');
            labelElement.textContent = building.labelNumber + ".";
            // Positionner le label légèrement à gauche et au-dessus/au même niveau que l'input
            // Ajustez 'calc' pour un positionnement fin du label par rapport à la case.
            labelElement.style.top = `calc(${building.position.top} + 5px)`; // Centré verticalement avec la case
            labelElement.style.left = `calc(${building.position.left} - 25px)`; // À gauche de la case
            imageContainer.appendChild(labelElement);
            
            // Créer la description dans la liste sous l'image
            const descriptionItem = document.createElement('li');
            descriptionItem.innerHTML = `<strong>${building.labelNumber}.</strong> ${building.description}`;
            buildingDescriptionsList.appendChild(descriptionItem);
        });
    }

    submitButton.addEventListener('click', function() {
        resultsArea.innerHTML = ''; 
        let allCorrect = true;

        buildings.forEach(building => {
            const inputElement = document.getElementById(building.id);
            const userAnswer = parseInt(inputElement.value);
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            // Utilise le numéro du label pour le feedback
            const buildingIdentifier = `Bâtiment N°${building.labelNumber}`; 

            if (userAnswer === building.correctAnswer) {
                resultDiv.textContent = `✅ ${buildingIdentifier}: Correct ! Style : ${architecturalStyles[userAnswer]}.`;
                resultDiv.classList.add('correct');
            } else {
                allCorrect = false;
                let feedbackText = `❌ ${buildingIdentifier}: Incorrect. `;
                if (isNaN(userAnswer) || !inputElement.value) {
                     feedbackText += `Vous n'avez pas donné de réponse. `;
                } else if (architecturalStyles[userAnswer]) {
                    feedbackText += `Vous avez choisi "${architecturalStyles[userAnswer]}". `;
                } else {
                    feedbackText += `Votre choix "${userAnswer}" n'est pas valide. `;
                }
                feedbackText += `La bonne réponse était N°${building.correctAnswer} (${architecturalStyles[building.correctAnswer]}).`;
                resultDiv.textContent = feedbackText;
                resultDiv.classList.add('incorrect');
            }
            resultsArea.appendChild(resultDiv);
        });

        if (allCorrect && buildings.length > 0) {
            const overallFeedback = document.createElement('h3');
            overallFeedback.textContent = "🎉 Félicitations ! Toutes vos réponses sont correctes !";
            overallFeedback.style.color = "#3c763d"; 
            overallFeedback.style.textAlign = "center";
            resultsArea.prepend(overallFeedback); 
        }
    });

    setupGame();
});