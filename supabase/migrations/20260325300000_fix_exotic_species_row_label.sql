-- Fix: exotic species table "Supported species" row label was empty in DB
-- Also ensure companion/avian/reptile/livestock species values are set
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('exotic', 'species_table', 'row_supported_label', 'Supported Species Row Label',    'Supported species',                                                       'text'),
  ('exotic', 'species_table', 'companion_species',   'Companion & Small Mammals List', 'Dogs, Cats, Rabbits, Guinea Pigs, Ferrets, Chinchillas, Rats, Mice, Hamsters', 'text'),
  ('exotic', 'species_table', 'avian_species',       'Avian Species List',             'Parrots, Pigeons',                                                        'text'),
  ('exotic', 'species_table', 'reptile_species',     'Reptile Species List',           'Turtles, Snakes, Lizards',                                                'text'),
  ('exotic', 'species_table', 'livestock_species',   'Livestock & Large Animals List', 'Horses, Alpacas, Camels, Pigs, Cattle, Sheep',                            'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;
