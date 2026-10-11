import json
from urllib import request as urlreq

# Test text classification
payload = json.dumps({
    "textDescription": "banana peel kela chilka organic",
    "source": "text"
}).encode()

req = urlreq.Request(
    'http://127.0.0.1:5000/api/classify',
    data=payload,
    headers={"Content-Type": "application/json"},
    method='POST'
)
resp = urlreq.urlopen(req, timeout=15)
result = json.loads(resp.read().decode())
data = result.get('data', {})
print("=== TEXT TEST: banana peel ===")
print(f"Stage 1 : {data.get('stage1Category')}")
print(f"Stage 2 : {data.get('stage2SubCategory')}")
print(f"Score   : {data.get('confidenceScore')}%")
print(f"Status  : {result.get('success')}")
print()

# Test plastic text
payload2 = json.dumps({
    "textDescription": "plastic bottle",
    "source": "text"
}).encode()
req2 = urlreq.Request(
    'http://127.0.0.1:5000/api/classify',
    data=payload2,
    headers={"Content-Type": "application/json"},
    method='POST'
)
resp2 = urlreq.urlopen(req2, timeout=15)
result2 = json.loads(resp2.read().decode())
data2 = result2.get('data', {})
print("=== TEXT TEST: plastic bottle ===")
print(f"Stage 1 : {data2.get('stage1Category')}")
print(f"Stage 2 : {data2.get('stage2SubCategory')}")
print(f"Score   : {data2.get('confidenceScore')}%")
print(f"Status  : {result2.get('success')}")
