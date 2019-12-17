import numpy as np
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt

# the minimum frequency for a word to appear in the chart
FREQUENCY_CUTOFF = 10

quotes = []
for i in range(1, 10):
    page = requests.get(f'http://quotes.toscrape.com/page/{i}/')
    soup = BeautifulSoup(page.content, features="html.parser")
    for quote in soup.find_all(attrs={"class": "text"}):
        quotes.append(quote)

words = []
for quote in quotes:
    quote_text = quote.text.translate({ord(c): None for c in '!@#$,.“”;'})
    for word in quote_text.split(' '):
        words.append(word.lower())
counted_words = {word: words.count(word) for word in words}
counted_words = sorted(counted_words.items(), key=lambda i: i[1], reverse=True)

frequencies = []
rankings = []
labels = []
singletons = []

entry_counter = 1
for entry in counted_words:
    if entry[1] > FREQUENCY_CUTOFF:
        rankings.append(entry_counter)
        entry_counter += 1
        frequencies.append(entry[1])
        labels.append(entry[0])
    else:
        singletons.append(entry[0])

print(singletons) # see which words didn't make the chart

cmap = plt.get_cmap('Spectral')
colors = [cmap(i) for i in np.linspace(0, 1, entry_counter)]
print(len(colors))
print(entry_counter)

plt.title("Word Frequencies")
plt.ylabel("Total Number of Occurrences")
plt.xlabel("Rank of the words")
for i in range(len(labels)-1):
    plt.text(x=rankings[i+1] - 0.3, y=frequencies[i+1] + 1, s=labels[i+1], rotation=90) #size=8
plt.text(x=rankings[0] - 0.3, y=frequencies[0] - 3, s=labels[i+1], rotation=90, color='white')
plt.axis([0, entry_counter, 0, frequencies[0] + 1])
plt.bar(
    rankings,
    frequencies,
    color=colors
)
plt.show()
