// updateInterface(void): Void
// When one of the car type 
// options is selected, updates
// the enabled / disabled options
// in the interface and resets to 
// default values (if required)
function updateCarType(type)
{

}

// calculateGames(void): Void
// Calculate the number of games required
function calculateGames()
{
  // Story Mode
  let story_games = 0;

  story_games = Math.max(
    // Games required for desired meter (Calculated by getting required stories for desired meter, subtracting stories required for current meter + the current win streak % 100)
    document.getElementById('racing-meter').value - (document.getElementById('current-meter').value + (document.getElementById('current-streak').value % 100)), 

    // Games required for desired soundtrack (Desired soundtrack games minus the number of already completed games)
    document.getElementById('soundtrack').value - document.getElementById('completed-stories').value
  );

  // If less than zero games are required (already achieved) set the number to zero
  if (story_games < 0) story_games = 0;

  // Update the story games element
  document.getElementById('story-games').value = story_games;

  // Ghost Mode
  let ghost_games = 0;

  let current_level = document.getElementById('current-dressup').value;
  let desired_level = document.getElementById('desired-dressup').value;
  let opponents = document.getElementById('opponents').value;

  // Level we are iterating on
  let level = current_level;

  // Loop over the different levels
  for (let dressup of DRESSUP)
  {
    // While we are less than or equal to the current level
    while(level <= dressup[0])
    {
      // If we exceed the desired level
      if (level >= desired_level)
      {
        // Do not add, break loop
        break;
      }

      // Increment the level
      level++;

      // Add to the games required
      ghost_games += (dressup[1] / (opponents * 100));
    }
  }

  // Round the games required up
  ghost_games = Math.ceil(ghost_games);

  // If less than zero games are required (already achieved) set the number to zero
  if (ghost_games < 0) ghost_games = 0;

  // Update the ghost games element
  document.getElementById('ghost-games').value = ghost_games;

  // Versus Mode
  let versus_games = 0;

  // Get the total value of the player's current medals
  let current_medals = (document.getElementById('gold').value * MEDALS.gold) + 
    (document.getElementById('silver').value * MEDALS.silver) + 
    (document.getElementById('bronze').value * MEDALS.bronze) + 
    (document.getElementById('plain').value * MEDALS.plain);

  // Target medal value total
  let target_medals = document.getElementById('versus-grade').value;

  // Switch on medal ratio
  switch(document.getElementById('ratio').value)
  {
    // Gold Only (Best Case)
    case 'allgold': 
      versus_games = Math.ceil((target_medals - current_medals) / MEDALS.gold);
      break;
    // Gold & Silver only
    case 'goldsilver': 
      versus_games = Math.ceil(((target_medals - current_medals) / (MEDALS.gold + MEDALS.silver)) * 2);
      break;
    // Even Ratio
    case 'alleven': 
      versus_games = Math.ceil(((target_medals - current_medals) / (MEDALS.gold + MEDALS.silver + MEDALS.bronze + MEDALS.plain)) * 4);
      break;
    // Plain Medals
    case 'allplain': 
      versus_games = Math.ceil((target_medals - current_medals) / MEDALS.plain);
      break;
  }

  // If less than zero games are required (already achieved) set the number to zero
  if (versus_games < 0) versus_games = 0;

  // Update the versus games element
  document.getElementById('versus-games').value = versus_games;

  // Extra Games (For Colours)
  let extra_games = 0;

  // Calculate the games required for the custom colour (if any)
  let desired_colour = document.getElementById('colour').value;
  let current_colour = document.getElementById('current-colour').value;

  // If we do not have the desired colour
  extra_games = (
    (desired_colour * 100) - 
    (
      (current_colour * 100) - (document.getElementById('next-colour-games').value - 100)
    )
  ) - (story_games + ghost_games + versus_games);

  // If less than zero games are required (already achieved) set the number to zero
  if (extra_games < 0) extra_games = 0;

  // Update the extra games element
  document.getElementById('extra-games').value = extra_games;

  // Calculate the total cost and update the element
  document.getElementById('total-cost').value = 
    document.getElementById('cost').value * (story_games + ghost_games + versus_games + extra_games);
}

// populateDropdown(id: String, values: Object)
// Given an element ID and an array of values, 
// populates the given drop-down with the elements
// provided.
function populateDropdown(id, values)
{
  // Get the id for the element provided
  let elem = document.getElementById(id);

  // Loop over the values
  for (let value of values)
  {
    // Create the option element
    let opt = document.createElement('option');

    // Name / description of the option 
    opt.innerHTML = value[0];

    // Value of the option
    opt.value = value[1];

    // Add the option to the element
    elem.appendChild(opt);
  }
}

// Populate the racing meter drop-downs
populateDropdown("racing-meter", METER);
populateDropdown("current-meter", METER);
populateDropdown("soundtrack", SOUNDTRACK);
populateDropdown("versus-grade", GRADES);