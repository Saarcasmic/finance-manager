import pandas as pd
from sklearn.cluster import KMeans
import json
import sys

def analyze_spending(expenses):
    df = pd.DataFrame(expenses)
    
    if df.empty:
        return json.dumps({"message": "No expenses data available for analysis."})
    
    # Assuming 'amount' and 'category' are columns in the expenses
    df['category'] = df['category'].astype('category').cat.codes

    # KMeans clustering to identify spending patterns
    kmeans = KMeans(n_clusters=3)
    df['cluster'] = kmeans.fit_predict(df[['amount', 'category']])

    cluster_centers = kmeans.cluster_centers_
    clusters = df.groupby('cluster').apply(lambda x: x.to_dict(orient='records')).to_dict()

    return json.dumps({
        'cluster_centers': cluster_centers.tolist(),
        'clusters': clusters
    })

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    result = analyze_spending(input_data)
    print(result)
