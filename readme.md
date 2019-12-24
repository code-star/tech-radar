# Tech Radar

The Tech Radar shows our view on current and emerging Information Technology, including historical
assessments. IT evolves over time, and our radar can be used to look into the past, showing the categorisation
and qualification we previously gave to the tools.

We track our assessments per item, periodically adding a timestamped entry to the radar-data.json.

## Data structures
* name: human readable name/description of the technology
* id: unique identifier of the technology
* timestamp: date/time tied to the assessment
* score: [Unknown|Hold|Assess|Trial|Adopt]
* category: one or more categories that the tech belongs to

When in multiple categories, the entry will appear multiple times on the radar. The scores can differ
depending on the category (a tool can be seen as 'Adopt' for one cat, but 'Hold' for another).

## Original Tech Radar
The `./example` folder contains the previous version of the tech radar, as it was updated in 2018.07.
It was sent to me by Hamza in May 2019, with the following comments:
Here’s the tech radar. The data itself is in `scripts/index.js`, the tags are:

* Zalando categories:
    * LG: Language
    * IF: Infrastructure
    * FW: Frameworks
    * DM: Data Management
* Our own categories:
    * BD: Big Data
    * OP: Operations
    * BE: Back-end
    * FE: Front-end
    
We tried to tag every tech someone introduced to the radar with both zalando’s and our categories,
to have two different perspectives and if you open index.html you will see two radars, 
each using those two different categories.
It’s quite out of date by now, it would be interesting to go through those again and see how it changed.
