# import pandas as pd
# import matplotlib.pyplot as plt
# import numpy as np
# import matplotlib.patches as mpatches
# import random

# # Load datasets
# soil_data = pd.read_csv('C:/Users/harsh.HARSHIKALA/Downloads/crop_rotation_sih/data/soil_data_india.csv')
# crop_data = pd.read_csv('C:/Users/harsh.HARSHIKALA/Downloads/crop_rotation_sih/data/crop_production.csv')

# # Strip whitespace from column names and values
# crop_data.columns = crop_data.columns.str.strip()
# soil_data.columns = soil_data.columns.str.strip()
# crop_data['Season'] = crop_data['Season'].str.strip()

# # Get unique crops, seasons, and soil characteristics
# unique_crops = crop_data['Crop'].unique()
# seasons = crop_data['Season'].unique()
# soil_textures = soil_data['Texture'].unique()

# # User-defined parameters
# num_plots = int(input("Enter the number of plots: "))
# num_periods = int(input("Enter the number of periods: "))
# selected_season = input(f"Select a season ({', '.join(seasons)}): ").strip()

# # Validate selected season
# if selected_season not in seasons:
#     raise ValueError(f"Selected season '{selected_season}' is not valid. Please choose from {', '.join(seasons)}.")

# # Optional: Allow user to input soil texture or use a default value
# selected_soil_texture = input(f"Select a soil texture ({', '.join(soil_textures)}): ").strip()

# # Validate selected soil texture
# if selected_soil_texture not in soil_textures:
#     raise ValueError(f"Selected soil texture '{selected_soil_texture}' is not valid. Please choose from {', '.join(soil_textures)}.")

# # Function to select crop based on season and soil texture
# def select_crop(season, soil_texture=None):
#     # Filter crop data based on season
#     crops_in_season = crop_data[crop_data['Season'] == season]
    
#     # Check if there are crops available for the selected season
#     if crops_in_season.empty:
#         raise ValueError(f"No crops available for the selected season '{season}'.")
    
#     # Further filter based on soil texture if provided
#     if soil_texture:
#         # Mocking the filtering process as crops_data does not directly link with soil_data
#         # In practice, you would need to match locations in soil_data with crop_data regions if available
#         # For demonstration, this just filters crops in general without actual soil data correlation
#         # Adding a condition to simulate soil texture-based filtering
#         crops_in_soil = crops_in_season  # In real use case, apply appropriate filtering
#     else:
#         crops_in_soil = crops_in_season
    
#     if crops_in_soil.empty:
#         raise ValueError(f"No crops available for the selected season '{season}' and soil texture '{soil_texture}'.")
    
#     return random.choice(crops_in_soil['Crop'].unique())

# # Generate dynamic rotation schedule
# rotation_schedule = []
# for plot in range(1, num_plots + 1):
#     schedule = []
#     for period in range(1, num_periods + 1):
#         crop = select_crop(selected_season, selected_soil_texture)  # Select crop dynamically based on the season and soil texture
#         schedule.append(crop)
#     rotation_schedule.append(schedule)

# # Collect unique crops from the rotation schedule
# crops_in_schedule = set(crop for schedule in rotation_schedule for crop in schedule)

# # Define a color map for crops involved in the schedule
# colors = plt.cm.get_cmap('tab10', len(crops_in_schedule))
# crop_colors = {crop: colors(i) for i, crop in enumerate(crops_in_schedule)}

# # Create figure and axis for the plot
# fig, ax = plt.subplots()

# # Create the rotation schedule plot
# for i, plot in enumerate(range(1, num_plots + 1)):
#     for j, period in enumerate(range(1, num_periods + 1)):
#         crop = rotation_schedule[i][j]
#         bar = ax.broken_barh([(j * 3, 3)], (plot - 0.5, 1), facecolors=crop_colors[crop])
#         # Annotate with the crop name
#         ax.text(j * 3 + 1.5, plot - 0.5 + 0.5, crop, color='black', ha='center', va='center', fontsize=8)

# # Set labels
# ax.set_xlabel('Period')
# ax.set_ylabel('Plot')
# ax.set_title('Dynamic Crop Rotation Schedule')

# # Set x-ticks and y-ticks
# ax.set_xticks(np.arange(3, num_periods * 3 + 3, 3))
# ax.set_yticks(np.arange(1, num_plots + 1))

# # Save the plot as an image file
# plt.savefig('/mnt/data/dynamic_crop_rotation.png', dpi=300, bbox_inches='tight')

# # Display the plot (optional)
# plt.show()

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import random
import os

# Load datasets
soil_data = pd.read_csv('data/soil_data_india.csv')
crop_data = pd.read_csv('data/crop_production.csv')

# Strip whitespace from column names and values
crop_data.columns = crop_data.columns.str.strip()
soil_data.columns = soil_data.columns.str.strip()
crop_data['Season'] = crop_data['Season'].str.strip()

# Function to select crop based on season and soil texture
def select_crop(season, soil_texture=None):
    crops_in_season = crop_data[crop_data['Season'] == season]
    if crops_in_season.empty:
        raise ValueError(f"No crops available for the selected season '{season}'.")
    return random.choice(crops_in_season['Crop'].unique())

# Main function to generate rotation schedule and save the plot
def generate_rotation_schedule(num_plots, num_periods, selected_season, selected_soil_texture):
    # Generate dynamic rotation schedule
    rotation_schedule = []
    for plot in range(1, num_plots + 1):
        schedule = []
        for period in range(1, num_periods + 1):
            crop = select_crop(selected_season, selected_soil_texture)
            schedule.append(crop)
        rotation_schedule.append(schedule)

    # Collect unique crops from the rotation schedule
    crops_in_schedule = set(crop for schedule in rotation_schedule for crop in schedule)

    # Define a color map for crops involved in the schedule
    cmap = plt.get_cmap('tab10')  # Use a colormap from matplotlib
    crop_colors = {crop: cmap(i / len(crops_in_schedule)) for i, crop in enumerate(crops_in_schedule)}

    # Create figure and axis for the plot
    fig, ax = plt.subplots()

    # Create the rotation schedule plot
    for i, plot in enumerate(range(1, num_plots + 1)):
        for j, period in enumerate(range(1, num_periods + 1)):
            crop = rotation_schedule[i][j]
            bar = ax.broken_barh([(j * 3, 3)], (plot - 0.5, 1), facecolors=crop_colors[crop])
            ax.text(j * 3 + 1.5, plot - 0.5 + 0.5, crop, color='black', ha='center', va='center', fontsize=8)

    # Set labels
    ax.set_xlabel('Period')
    ax.set_ylabel('Plot')
    ax.set_title('Dynamic Crop Rotation Schedule')

    # Set x-ticks and y-ticks
    ax.set_xticks(np.arange(3, num_periods * 3 + 3, 3))
    ax.set_yticks(np.arange(1, num_plots + 1))

    # Save the plot as an image file in the 'output' folder
    output_dir = 'output'
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, 'dynamic_crop_rotation.png')
    plt.savefig(output_file, dpi=300, bbox_inches='tight')

    return output_file