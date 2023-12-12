const incomeRates = [
    {
      "en": "Federal", 
      "fr": "Fédéral", 
      "abatement": [
        {
          "QC": 0.835,
        }
      ], 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 15000, 
          "rates": [
            {
              "rate": 0.15, 
              "threshold": 0
            }, 
            {
              "rate": 0.205, 
              "threshold": 53359
            }, 
            {
              "rate": 0.26, 
              "threshold": 106717
            }, 
            {
              "rate": 0.29, 
              "threshold": 165430
            }, 
            {
              "rate": 0.33, 
              "threshold": 235675
            }
          ]
        }
      ]
    }, 
    {
      "en": "Alberta", 
      "fr": "Alberta", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 21003, 
          "rates": [
            {
              "rate": 0.1, 
              "threshold": 0
            }, 
            {
              "rate": 0.12, 
              "threshold": 142292
            }, 
            {
              "rate": 0.13, 
              "threshold": 170751
            }, 
            {
              "rate": 0.14, 
              "threshold": 227668
            }, 
            {
              "rate": 0.15, 
              "threshold": 341502
            }
          ]
        }
      ]
    }, 
    {
      "en": "British Columbia", 
      "fr": "Colombie-Britannique", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 11981, 
          "rates": [
            {
              "rate": 0.0506, 
              "threshold": 0
            }, 
            {
              "rate": 0.077, 
              "threshold": 45654
            }, 
            {
              "rate": 0.105, 
              "threshold": 91310
            }, 
            {
              "rate": 0.1229, 
              "threshold": 104835
            }, 
            {
              "rate": 0.147, 
              "threshold": 127299
            }, 
            {
              "rate": 0.168, 
              "threshold": 172602
            }, 
            {
              "rate": 0.205, 
              "threshold": 240716
            }
          ]
        }
      ]
    }, 
    {
      "en": "Manitoba", 
      "fr": "Manitoba", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 15000, 
          "rates": [
            {
              "rate": 0.108, 
              "threshold": 0
            }, 
            {
              "rate": 0.1275, 
              "threshold": 36842
            }, 
            {
              "rate": 0.174, 
              "threshold": 79625
            }
          ]
        }
      ]
    }, 
    {
      "en": "New Brunswick", 
      "fr": "Nouveau-Brunswick", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 12458, 
          "rates": [
            {
              "rate": 0.094, 
              "threshold": 0
            }, 
            {
              "rate": 0.14, 
              "threshold": 47715
            }, 
            {
              "rate": 0.16, 
              "threshold": 95431
            }, 
            {
              "rate": 0.195, 
              "threshold": 176756
            }
          ]
        }
      ]
    }, 
    {
      "en": "Newfoundland and Labrador", 
      "fr": "Terre-Neuve-et-Labrador", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 10382, 
          "rates": [
            {
              "rate": 0.087, 
              "threshold": 0
            }, 
            {
              "rate": 0.145, 
              "threshold": 41457
            }, 
            {
              "rate": 0.158, 
              "threshold": 82913
            }, 
            {
              "rate": 0.178, 
              "threshold": 148027
            }, 
            {
              "rate": 0.198, 
              "threshold": 207239
            }, 
            {
              "rate": 0.208, 
              "threshold": 264750
            }, 
            {
              "rate": 0.213, 
              "threshold": 529500
            }, 
            {
              "rate": 0.218, 
              "threshold": 1059000
            }
          ]
        }
      ]
    }, 
    {
      "en": "Northwest Territories", 
      "fr": "Territoires du Nord-Ouest", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 16593, 
          "rates": [
            {
              "rate": 0.059, 
              "threshold": 0
            }, 
            {
              "rate": 0.086, 
              "threshold": 48326
            }, 
            {
              "rate": 0.122, 
              "threshold": 96655
            }, 
            {
              "rate": 0.1405, 
              "threshold": 157139
            }
          ]
        }
      ]
    }, 
    {
      "en": "Nova Scotia", 
      "fr": "Nouvelle-Écosse", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 11481, 
          "rates": [
            {
              "rate": 0.0879, 
              "threshold": 0
            }, 
            {
              "rate": 0.1495, 
              "threshold": 29590
            }, 
            {
              "rate": 0.1667, 
              "threshold": 59180
            }, 
            {
              "rate": 0.175, 
              "threshold": 93000
            }, 
            {
              "rate": 0.21, 
              "threshold": 150000
            }
          ]
        }
      ]
    }, 
    {
      "en": "Nunavut", 
      "fr": "Nunavut", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 17925, 
          "rates": [
            {
              "rate": 0.04, 
              "threshold": 0
            }, 
            {
              "rate": 0.07, 
              "threshold": 50877
            }, 
            {
              "rate": 0.09, 
              "threshold": 101754
            }, 
            {
              "rate": 0.115, 
              "threshold": 165429
            }
          ]
        }
      ]
    }, 
    {
      "en": "Ontario", 
      "fr": "Ontario", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 11865, 
          "rates": [
            {
              "rate": 0.0505, 
              "threshold": 0
            }, 
            {
              "rate": 0.0915, 
              "threshold": 49231
            }, 
            {
              "rate": 0.1098, 
              "threshold": 86698
            }, 
            {
              "rate": 0.13392, 
              "threshold": 98463
            }, 
            {
              "rate": 0.174096, 
              "threshold": 102135
            }, 
            {
              "rate": 0.189696, 
              "threshold": 150000
            }, 
            {
              "rate": 0.205296, 
              "threshold": 220000
            }
          ]
        }
      ]
    }, 
    {
      "en": "Prince Edward Island", 
      "fr": "Île-du-Prince-Édouard", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 12750, 
          "rates": [
            {
              "rate": 0.098, 
              "threshold": 0
            }, 
            {
              "rate": 0.138, 
              "threshold": 31984
            }, 
            {
              "rate": 0.167, 
              "threshold": 63969
            }, 
            {
              "rate": 0.1837, 
              "threshold": 101104
            }
          ]
        }
      ]
    }, 
    {
      "en": "Quebec", 
      "fr": "Québec", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 17183, 
          "abatementID": "QC",
          "rates": [
            {
              "rate": 0.14, 
              "threshold": 0
            }, 
            {
              "rate": 0.19, 
              "threshold": 49275
            }, 
            {
              "rate": 0.24, 
              "threshold": 98540
            }, 
            {
              "rate": 0.2575, 
              "threshold": 119910
            }
          ]
        }
      ]
    }, 
    {
      "en": "Saskatchewan", 
      "fr": "Saskatchewan", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 17661, 
          "rates": [
            {
              "rate": 0.105, 
              "threshold": 0
            }, 
            {
              "rate": 0.125, 
              "threshold": 49720
            }, 
            {
              "rate": 0.145, 
              "threshold": 142058
            }
          ]
        }
      ]
    }, 
    {
      "en": "Yukon", 
      "fr": "Yukon", 
      "timeframe": [
        {
          "year": 2023, 
          "exemption": 15000, 
          "rates": [
            {
              "rate": 0.064, 
              "threshold": 0
            }, 
            {
              "rate": 0.09, 
              "threshold": 53359
            }, 
            {
              "rate": 0.109, 
              "threshold": 106717
            }, 
            {
              "rate": 0.128, 
              "threshold": 165430
            }, 
            {
              "rate": 0.15, 
              "threshold": 500000
            }
          ]
        }
      ]
    }
  ];
