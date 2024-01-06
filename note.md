> **Faber API:** http://127.0.0.1:8021/api/doc#/

> **Live connections:** http://127.0.0.1:8021/connections

- **faber invitation** from the terminal is different from the **website invitation**.

# Notable mentions

- faber agent has the public DID that you got from the registering in http://dev.greenlight.bcovrin.vonx.io/ website. The DID is like this-
  `did:sov:NsZG7LZT1c84GmdiswtUhf`
- The first connection one is created when you run `./run_demo faber` and `connection_protocol` is normally `didexchange/1.0`

```json
[
  {
    "rfc23_state": "invitation-sent",
    "routing_state": "none",
    "updated_at": "2023-11-24T17:48:19.805775Z",
    "invitation_mode": "once",
    "state": "invitation",
    "accept": "auto",
    "connection_id": "893b7b75-2755-436e-afe2-949bc5334456",
    "created_at": "2023-11-24T17:48:19.805775Z",
    "their_role": "invitee",
    "connection_protocol": "didexchange/1.0",
    "invitation_key": "bPLF57L7L18f6yv4yjuA3jEXLGR2HKpgg6mBhwbhkDR",
    "invitation_msg_id": "2f38e6d3-4498-46d8-950c-537088fb573a"
  },
  {
    "rfc23_state": "invitation-sent",
    "routing_state": "none",
    "updated_at": "2023-11-24T17:55:17.627296Z",
    "invitation_mode": "once",
    "state": "invitation",
    "accept": "auto",
    "connection_id": "fb16c392-6034-4731-ac47-71295d74e2ea",
    "created_at": "2023-11-24T17:55:17.627296Z",
    "alias": "Faber Website",
    "their_role": "invitee",
    "connection_protocol": "connections/1.0",
    "invitation_key": "EHPppFvkzswye6UhfkJ5zQ83g65peb1iF8Xq4U7UnnWX"
  }
]
```

- The second connection is created when you post data to `axios.post('http://127.0.0.1:8021/connections/create-invitation?alias='+memoName,data)` via posting to `/newCon` via the website.
- `invitation_key` from above will be the same as `recipientKeys` of `invitation_url` from the response of `create-invitation` endpoint.
- `axios.get('http://127.0.0.1:8021/credential-definitions/created')` gets already created definitions from the ledger(probably).
- Response of `http://127.0.0.1:8021/issue-credential/send-offer`

  ```json
  {
  thread_id: 'f13565cd-adac-448b-9375-9059761142b9',
  auto_issue: true,
  auto_offer: false,
  updated_at: '2023-11-24T21:03:17.770179Z',
  role: 'issuer',
  created_at: '2023-11-24T21:03:17.770179Z',
  connection_id: '75773662-ecd0-471e-a078-b52a5db28834',
  credential_offer_dict: {
  '@type': 'https://didcomm.org/issue-credential/1.0/offer-credential',
  '@id': 'f13565cd-adac-448b-9375-9059761142b9',
  '~thread': {},
  comment: 'Offer on cred def id NsZG7LZT1c84GmdiswtUhf:3:CL:229455:faber.agent.web_schema',
  'offers~attach': [ [Object] ],
  credential_preview: {
    '@type': 'https://didcomm.org/issue-credential/1.0/credential-preview',
    attributes: [Array]
  }
  },
  schema_id: 'NsZG7LZT1c84GmdiswtUhf:2:web schema:41.40.29',
  state: 'offer_sent',
  credential_offer: {
  schema_id: 'NsZG7LZT1c84GmdiswtUhf:2:web schema:41.40.29',
  cred_def_id: 'NsZG7LZT1c84GmdiswtUhf:3:CL:229455:faber.agent.web_schema',
  nonce: '315769141799571418324171',
  key_correctness_proof: {
    c: '55906813272888089271615127626507413050515833607437318696319673177670734807199',
    xz_cap: '399152143498153888872465856985656001667560047335941911356831769285510703664683165088094080946778974126020962195545462979486835906073146597130562455988056773520299177291872596016710144856645579996395605477340698947321362904710951142605224528523689933996270540405851315618326791871178648050810195078477902654982655457894668247590059748862566467031184873644035186993227801539903295250802046857922652574612836967428444916635194741056372332447284021752198668009604307993302690349233291495060450293474915760709288035235157070520812888268733719433810658885755644834994499223078132411205730813989415346188771002571570976050258772138908516454061514602440950413634873406332206681382526608289101298135579',
    xr_cap: [Array]
  }
  },
  auto_remove: true,
  initiator: 'self',
  credential_definition_id: 'NsZG7LZT1c84GmdiswtUhf:3:CL:229455:faber.agent.web_schema',
  credential_proposal_dict: {
  '@type': 'https://didcomm.org/issue-credential/1.0/propose-credential',
  '@id': 'd818ba68-cff0-405d-bf01-82d9e4308562',
  comment: 'Offer on cred def id NsZG7LZT1c84GmdiswtUhf:3:CL:229455:faber.agent.web_schema',
  cred_def_id: 'NsZG7LZT1c84GmdiswtUhf:3:CL:229455:faber.agent.web_schema',
  credential_proposal: {
    '@type': 'https://didcomm.org/issue-credential/1.0/credential-preview',
    attributes: [Array]
  }
  },
  credential_exchange_id: '20c28961-7c1c-415b-9a7c-62a3246698e9'
  }
  ```

- The below Schema was created and published on the ledger when you run `./run_demo faber`. And those `attrNames` were used in creating and issuing VC.

```json
Schema:
{
  "sent": {
    "schema_id": "NsZG7LZT1c84GmdiswtUhf:2:web schema:41.53.28",
    "schema": {
      "ver": "1.0",
      "id": "NsZG7LZT1c84GmdiswtUhf:2:web schema:41.53.28",
      "name": "web schema",
      "version": "41.53.28",
      "attrNames": [
        "timestamp",
        "name",
        "birthdate_dateint",
        "email",
        "address",
        "role"
      ],
      "seqNo": 229442
    }
  },
}
```

- When you click <button style="background-color:purple;color:white;font-weight:bold">
  Request Proof
  </button> button `app.get(/profReq)...` code gets executed via `dummy.ejs` inside script.

- The below json is from `connections` endpoint. `their_did` is `Aries Bifold`'s DID that is your phone's DID. **Most of the operation of the application is done using the `connection_id`.**

  ```json
  {
    "results": [
      {
        "their_label": "Aries Bifold",
        "created_at": "2023-11-24T20:48:48.960857Z",
        "routing_state": "none",
        "accept": "auto",
        "invitation_mode": "once",
        "alias": "faber",
        "connection_id": "75773662-ecd0-471e-a078-b52a5db28834",
        "my_did": "TV8X1MHvn6UbadxEbaSLma",
        "rfc23_state": "completed",
        "state": "active",
        "their_role": "invitee",
        "their_did": "ARgeMtDb2zUG6KZ3YFwtCE",
        "connection_protocol": "connections/1.0",
        "updated_at": "2023-11-24T21:00:23.855737Z",
        "invitation_key": "J3wBkzhpqePSt9rGA6CetfWaMxR5bLNdbBZJepTjtdht"
      },
      {
        "created_at": "2023-11-24T20:45:22.762811Z",
        "routing_state": "none",
        "accept": "auto",
        "invitation_mode": "once",
        "connection_id": "6ab1c2d8-1564-4490-94ba-cc7b5493f44e",
        "rfc23_state": "invitation-sent",
        "state": "invitation",
        "invitation_msg_id": "44d22065-3cae-4b83-b845-4c08ffc784dd",
        "their_role": "invitee",
        "connection_protocol": "didexchange/1.0",
        "updated_at": "2023-11-24T20:45:22.762811Z",
        "invitation_key": "ExGFyZzZKJH46ThQwKMuGEvsd4hugeDHMopJM5znguiw"
      }
    ]
  }
  ```

- Below is the response from `present-proof/send-request` endpoint. We get `@id` property at the beginning when getting a new connection from `create-invitation` endpoint.
  ```json
  {
  thread_id: '69e46490-a8be-464f-adb1-c7e5babea061',
  created_at: '2023-11-24T22:24:41.126678Z',
  trace: false,
  connection_id: '75773662-ecd0-471e-a078-b52a5db28834',
  presentation_request_dict: {
    '@type': 'https://didcomm.org/present-proof/1.0/request-presentation',
    '@id': '69e46490-a8be-464f-adb1-c7e5babea061',
    'request_presentations~attach': [ [Object] ]
  },
  state: 'request_sent',
  initiator: 'self',
  presentation_exchange_id: 'd0fc75c0-5c37-4e62-90e7-42f57101348e',
  updated_at: '2023-11-24T22:24:41.126678Z',
  role: 'verifier',
  auto_present: false,
  presentation_request: {
    nonce: '53832088658834425253333',
    name: 'Proof of Role',
    version: '1.0',
    requested_attributes: { '0_role': [Object] },
    requested_predicates: {}
  }
  }
  ```
- When you check active connection with DID after from checking from `/checkMemName` endpoint `/activeConctd` endpoint gets executed. It sets the conID(connection id) cookie and session. Then it renders the `proof.ejs` page.
- When you present info from phone in response to a proof request, the verification takes place (not in the application) and below document is received via `app.post(/webhooks/*)...` endpoint.

  ```json
  {
  thread_id: 'd5ae0548-35cd-484d-9ee1-196fdd6eba48',
  created_at: '2023-11-24T22:51:04.975714Z',
  trace: false,
  connection_id: '75773662-ecd0-471e-a078-b52a5db28834',
  presentation_request_dict: {
    '@type': 'https://didcomm.org/present-proof/1.0/request-presentation',
    '@id': 'd5ae0548-35cd-484d-9ee1-196fdd6eba48',
    'request_presentations~attach': [ [Object] ]
  },
  state: 'verified',
  verified_msgs: [ 'RMV_GLB_NRI' ],
  initiator: 'self',
  presentation: {
    proof: { proofs: [Array], aggregated_proof: [Object] },
    requested_proof: {
      revealed_attrs: [Object],
      self_attested_attrs: {},
      unrevealed_attrs: {},
      predicates: {}
    },
    identifiers: [ [Object] ]
  },
  verified: 'true',
  presentation_exchange_id: '4fefa46c-c99f-4b97-9065-b2a88db711e6',
  updated_at: '2023-11-24T22:53:06.369507Z',
  role: 'verifier',
  auto_present: false,
  presentation_request: {
    nonce: '527698642083222933690606',
    name: 'Proof of Role',
    version: '1.0',
    requested_attributes: { '0_role': [Object] },
    requested_predicates: {}
  }
  }
  ```

- The url that is provided from ngrok corresponding to `localhost:8020` is the service-endpoint of Faber. You can find that in the did document which is resolved from `...resolver/resolve/{DID}` endpoint-
  ```json
  {
    "did_document": {
      "@context": ["https://www.w3.org/ns/did/v1"],
      "id": "did:sov:NsZG7LZT1c84GmdiswtUhf",
      "verificationMethod": [
        {
          "id": "did:sov:NsZG7LZT1c84GmdiswtUhf#key-1",
          "type": "Ed25519VerificationKey2018",
          "controller": "did:sov:NsZG7LZT1c84GmdiswtUhf",
          "publicKeyBase58": "CvQZeE25E92y3QFWL1RVSc45HgDA1TEmB1sPPK9HSMxt"
        }
      ],
      "authentication": ["did:sov:NsZG7LZT1c84GmdiswtUhf#key-1"],
      "assertionMethod": ["did:sov:NsZG7LZT1c84GmdiswtUhf#key-1"],
      "service": [
        {
          "id": "did:sov:NsZG7LZT1c84GmdiswtUhf#did-communication",
          "type": "did-communication",
          "serviceEndpoint": "https://3c17-123-136-28-130.ngrok-free.app",
          "accept": ["didcomm/aip2;env=rfc19"],
          "priority": 1,
          "routing_keys": [],
          "recipient_keys": ["did:sov:NsZG7LZT1c84GmdiswtUhf#key-1"]
        }
      ]
    },
    "metadata": {
      "resolver_type": "native",
      "resolver": "IndyDIDResolver",
      "retrieved_time": "2023-12-03T15:24:47Z",
      "duration": 3046
    }
  }
  ```
- Response from `.../issue-credential/create-offer` looks like the following(it is independent of any proposal or connection)-

  ```json
  {
    "thread_id": "6be02161-680d-4225-b706-92f0b81307aa",
    "auto_issue": true,
    "credential_definition_id": "NsZG7LZT1c84GmdiswtUhf:3:CL:229891:faber.agent.web_schema",
    "state": "offer_sent",
    "credential_offer_dict": {
      "@type": "https://didcomm.org/issue-credential/1.0/offer-credential",
      "@id": "6be02161-680d-4225-b706-92f0b81307aa",
      "~thread": {},
      "~trace": {
        "target": "log",
        "full_thread": true,
        "trace_reports": []
      },
      "offers~attach": [
        {
          "@id": "libindy-cred-offer-0",
          "mime-type": "application/json",
          "data": {
            "base64": "eyJzY2hlbWFfaWQiOiAiTnNaRzdMWlQxYzg0R21kaXN3dFVoZjoyOndlYiBzY2hlbWE6ODAuOTUuODkiLCAiY3JlZF9kZWZfaWQiOiAiTnNaRzdMWlQxYzg0R21kaXN3dFVoZjozOkNMOjIyOTg5MTpmYWJlci5hZ2VudC53ZWJfc2NoZW1hIiwgImtleV9jb3JyZWN0bmVzc19wcm9vZiI6IHsiYyI6ICIxMDUwOTg4Mjc4MzU2NTA0NTE0Njk3MjQyMDk4NzM1NTY1MDA0MTEyMjYwMjQ4ODMxNjk3MDg3Njk0MDI3MzczNTMyNjYyMzY4MjkxMDIiLCAieHpfY2FwIjogIjk4MTQyOTEzNDY2OTEzMTI4ODU5MTcxODcyODExNDg1MjYwODY2MDIxNTg1ODY5MTc4MzQzOTgxMjA2MzI5NDQ3NDE1Njk5NDkyNTc4ODMyNTI4NjI4MjIwNTg0ODUxMDkwNzg3OTAxOTUyNDg0Nzk0NjkyMjUxNTU2MzkzNzAzMjI1MDQ3OTE5OTk1NzM4NzE3MTk5Nzc3MDU2MDA1NTYyNDg4OTE3NzEzNjgyODEwMTk3Mjg2MDc4OTI1MDM5MDAxNjQ1NzQ2MDc2NjI4OTYyODM0ODIzOTE5MjE2ODI0NTQxNTQ5OTI1MDM5NDQzMDk2MjkyNDAwODc3MDE2NDgzNDczNjM0NzUzNzExNjU2NTk2NDIwOTE0ODUzMDc0NzAwOTY3MzA1MDkxNjEwMjM4MjkxODA4MTc5MTY0NTMwMzQ3Njc4ODA1ODc3OTI5MTA5MDkzMjA0Njc2MjUxNjk5NTM2ODA5Mjg5NDg5Njk0ODM1MzYwMzU2NDc0NDY3NDEyNjgyMTYzODY2MzkxMTM1NTQyODY0NzcyOTY5MjY4NTI4ODgwMjkxMTQ4MjI0NTgwNjQ3ODEzNzc0OTY1MzA2NDk4NjM1MDI3NTgxNjMzNTY5NzYyMTE5OTkyMDYwNjUwMzQ1NzMzMTI0MjU2NjI5NzYwOTEwNjU4NDAzNjA2Njk0ODQyNjUyMTcwMDgwMjUwODAzNTA4NjIwNTM0MDE1MDU1NzI4NDc5NDk4ODU4MTczMTkxNjcwNzMxODQxODU4ODk1NzI0MjA0MjAwNjQzMTkxNDA2MTEzNTUxMDA3OTkzNDY5NDYxNDE1Mjg4MTUzNzUxMTc0NTk1MDE4NzIzMTQwNjI0MjU1Njc3MzA0MzYyMjkyMTIxNTA0NTU4NjIwMzE2NjkyNTk2Mjc2NDMwMzg5NyIsICJ4cl9jYXAiOiBbWyJiaXJ0aGRhdGVfZGF0ZWludCIsICI3ODI5MTcwMDIwMTEwMDg3OTEyMjU0OTQ4NzQ4Mjc2NzY1ODA1NzYyNTcxODM0MjMwMDcxNDc4MzQ3OTA2Mzk2NDYzMjMwOTQ2OTk2NjU0MTAxMjE3MDE1NDY4NjI5MTY0NzQxMDMwNzE2NTM1OTU4NTEzOTc2MzYyMjEwMTA3MzYxOTA1NTIyMzI5MTQ5OTAzMDU3NzA0NTA0NDI0MTUzNDYyMjg2NDEwODQ5NzkzODgxNjIzNDc0NTUyNzgyNTg2NzcxNjM3NzU2NDU3MjEwOTkyNTIwMzM3MzkwNTU2MjA1ODIxNTQyNzg5MTcwMzE0OTY3MjU3MjE5OTExNjI0MTA3MzEzMDc1MTM1NDA0MTA3MzU4OTkzODY1MDE0NTUzMDUwNjc5MTA2MzA4NzI1NTg3MjU1OTg2NTQ2ODI5MTA0MzUzNDM0ODg4NjEyNzU0NjQ0NjM1MjIyODQ4Mzc5MDE3ODM4NzIyNzQwNDYyMjkxMDcwOTcxNTU4MjIxMTM2NjM2NzA4MjYyNTc5MzU0ODk1NDIwNzIyNTU5MDE0ODg3NDY2MzAwMzk2MTgwMjc1ODE2MDMyNzYwMzk5MTk0NTg0NDU0NTk5NjQ2NTgwMzU5NDE2NjIwMjA0Njk5MjkxNTYyNzIyOTYwODk4MzE1NTQyNDU4MDE3Nzc0NjIzNTg5MzExNDUwOTQzNzk1MzQ5NDI2NDI1ODQ3NTUyNjA0MTY3MDU4NTg3MzM1NDM1NTQ1NTUwMzQ4NTUzNjg2MzE5MTIyMDczMjIxNDE0NDEwOTE5MDIzOTYzMjk1Mjk3MjI3MjE4MTY0ODg4NzA5MDY4ODU4NTExMzk5NzU5NzkyNjczMDgyNTM1MTg4Nzk4OTU1Nzk5ODkzMTY0NzUyMjAyNDkwOTAyMTk3MDYxMTE5NzgxNTAiXSwgWyJyb2xlIiwgIjE4MzA4MjEyMDUzMDYxNjYyNzI0MjQ5MDc5ODI3MTM4MTgyOTg2NTU3OTE5NTMwNjE4NjY2NDI4NTY5MDMyNzc3ODk1MjUwOTQzMzAzMzY1NjI1ODQwODg1NTM0NTU1MTcxNzQzNDUyNDg0NTg4OTc3MTk0OTY2ODQzNDI0NTk1ODgwMDM5NTU1MDE4NDMwOTQ2MjA4Mzk0ODM1NDkzMDM3ODQwMjA2MDY1ODg1MzQ5OTcwNzQyNjI5MDIyOTIxOTA0NjY4NzAwMTU0ODQwMDM2NTkxNjY4OTM4NjMxNTMyNzk4ODAwNDQzNDUyMzY1NzA2NjEwODIzODU2NTA0MDg1ODM4NDMzODkwMjg2MDE3NDQxMzU4OTYyMzc3MjI1MzU1NDk0MzAyMjIwMDQzMTk0ODc4MzE2OTU3MzEzNDY2NTA4MzUxMDg2Nzc4Mjg4Mjk5Nzk0NjA1ODU2MzEyMDE0Njc3NjQ1MjA1MzY0NTk2MDU5ODU2NjIzMzI3ODcxNTIyNDQyODgwNzI5MzE2NDg3MTQ5NDM2MjAxMjMwNTQxNTk5MzQ2MzkwODEyNjQ0MDU3MDQxMjA0OTY1NDE4MjQyMTYwMjg1MzU4NDMzMzM4NTE2ODkxNzM4MzE1ODUxNDQ4NzY3MzU1MTM4NzUwMzUwNjUzNzQ0NzQ1ODM3Mjg0NjM5NTg1MjcwNTMzMjgzMzY3MjAxMjIyMjE2MzE3NDA3ODEyOTA1Mjc4MzYwNzE5MTI0OTUwNjg0MzM2OTk4NDI5MTk0NDA2MTUwODkwMDI4NjQ2NzUwMzUzOTEwMjc3MDU5MzczMDg2ODkzNTgzNDU4NzE2Nzg3NjgxNzcxNzA1NDUxMDA5NzQ1NTkzMDExNjU0NDM3MDc2NjM2OTgwMTY4NTEwNjE1OTA4MzgyNzg1MTQ3NjgiXSwgWyJuYW1lIiwgIjEwOTMzNjYzNjY4NjIwNDY2MzE1NjIwMzYzODY3NDI5MDEyNjUyNjc1Njk2NjQwMDMxMDM2NTM5MzQxNzkyOTQ2NzExOTIxMzkyNDEyMTQ1MDM0MjYwOTU5NDQyMDc2MzMyNDI1NjQ3Njg5MjU5MTMzNDQyNDc4NDE1OTU0MzczNDc5MzQ2OTU0OTQ1MjAwMDE5OTE3MzQ4Nzg5NTYwNDc5MjA2MzQ2NzI1Njk3Njc1MzcxMjA5NzgyNjA2NTE0MDk3NDUxOTkxNjQwNDEzOTE0Nzc3NDg4MDE4MDM2MTI1NDk2ODcxODM1NjA4Mjk3NDI3ODkwOTQ4Mjc1NzAwMjQ2NDc1OTY5MjQyODY2Njk3MjIxMDIyMDU5MzQwMTU4MzE1MTA1MDY2ODMwMTY3ODQyMjk5Mzk4NjQ2MTYwMDE2NjI5MzQ4MzkxNDYzMDgzOTM3OTc0NTQ0OTg3MjcwMzkxODcyMTQ0NjAzNzY0MDQwNDc0NTc5OTcwNzU0NjE0MDkxMzYxNDI1MTM2NDI4MDcwNDYzNDMxMjcwNzE5NzUxNjY4ODM3NDE3Nzc5NzE1MjQ1MjE3NDIzODY3MzAxMTgxNDMyNTE3MzE4MjEzMTUwNTA3MjAyNjA2NzE2MTA1NjI2Mjg2OTk3ODY0MDQ4NjgzOTI3MDIwMDQzMjgzOTY2Nzk1NjY2MTA4MTgxNjUwMTM5MDg5NTY2NTAwMzc4NDg3NTYzMTkyNjg2Mjk1NzcxMDYxOTI4MDYxNjMyNTg2Mzg1NDIyOTQxNzcyOTkyNDM1NTE3NDMzODc2Mzk0MTYwNzg1Mjg2OTY2OTI4NTkxNDMzOTkwNjExNzYxNTIwNjc0OTI1MjUzODU4NDQ1MjQ3MzE0NDQxOTAyMDg1NTI4ODUyNjE2NzY3Mjk2MDAzOTU4MzgyODAiXSwgWyJlbWFpbCIsICIyMDcyMjI0OTE0NjE4NDQyOTI4NDAzNTg3MjI5MTQxMzE3MTM0NTQ1Mzk3NDc4OTAxNzA0NTkwNjc0ODUyNzAzMTUxOTI2NjA5ODE4MDc1ODA2OTUzNTQ1NjUwNDAwNDU0MTU3NDQzOTgyNjQ2NTA5NDkyMDI1MjQwMDgyMzcxMzY1MTMyMjUxMTcxNDE2NDg2NTY0ODc0MTg3MjA4ODk5MzM4NTU0MjE0MTM1Nzc4MDU5MDc2MDA2NjAwNTMxMzA1NTEwMDY4MTg2MjI5MzA1OTM2MDEwMTAwODIxNjcxODg2MzI5OTU1ODg0OTI2NDM4ODQzODk1NzI2MDk2MTQ5NzY4MTUxOTg0MTQ1NzI5MjcyODgzMzAxODQ3MzA1MjkxMDkwNTU1MzE0MDU3OTM2Mjc3MDUwNTI5Njk3Nzk2Nzk0MzA2Njc4NzQ0MzUzOTk4MjAxMDQ0MzM0MzMyNjA5NTY1OTUzNDI0MTk5MDc3ODQ1MzA4NTY1NzA2MjcwMTMyNjU1Mzc2ODQ1MzMwNzY5OTU1NDA5OTc5NTQwMzc5NDA2MjQ4NjMyMjE3MTM3OTMxNjg2MjY1MjkwMjI0NDM1ODMzOTAzMDg5OTk4MDYyNzczNTM1MTU3MjU4MTc1MTY2MDQ0MzYzMDQ2MzAzMTgwMjgyNzA3OTI5Njk0NzU0MTY5NDE1NDUxNDI4OTgzODc0NzQ3NjQ3NTM2NTczMDg2MjQwNTcyNzUyMjgzNDIxMTYzNTQ5NDczNTQ1ODk3MTU0MDc3MTY1OTY0NDQxMjM0NDQ0NzE4MjE0OTQ2NTAzMDM4NzIwNjgxMTkxNzMxODQwMDUzMTg2ODE3Nzg3NjkwMzI0NzUzNTQ4MDg1Njg3MzQ3MTE1MDQ1NjUwNDczNDIwMzg5OTI1MTM4MzExNzE1MjQzNzgxIl0sIFsibWFzdGVyX3NlY3JldCIsICIxMzg4OTE1MjkyMDk3OTczNTg5NjkzNjMyODQ5NDUzODkxMjQ3NTEzNTI0NzEzODgxNzg4MDYzNTEwMDE1NzM4ODkzNDA5MjI0NTAwMjQ2NzIwNzY0OTc1NjE0NDA2MzE2NTExMTEzOTg2NDM1MDk0MjU5NTQ5MDU2NTMyMTc3NjAyMDY1OTA2OTMyOTY5NDk2MDYzMTI4NTIwMjcwNjEyNjQ2MDQ3ODIxNDU5NTQzODM0MTMyNjY5MTYzNjQ3ODE0ODIwMDczNzkzMjU2Mjc4NDc3MDM1MDA4MjY2Nzk2NzM5NTMwMjY4MjUwNDYwMzA4NTM5MzA5OTM4OTIxMDA3Njc0NTMzODcxMTEwMDgzMzI4MTg0Mjk3NTI2MTI2NjkxNTI3ODUxMzgyODE4NTI3OTI4MDkxMzAwMDQ1MDgxNTAwMzc0MDIzOTk5MDUwMTA5NTk4MjgyMjI4MDA5NTg5ODUzNzUyMTQ5ODc5NjE1NDg4Mjk1MDI5MjA1NDMyMzc1MjUwOTA2OTE4MTQzMzQzNTYyMDcwNDkyNDgzMzQyOTAzMzc2NjY0NzczNTkzMzg3MjczNjI0NDg0NTk2MTM2NDIwODk3NjIwNDg1NDI5MzkwOTM4NDUxNzIwMTk2MzEzODk4NzI0ODY1MzU4NDc5NDIxMjQ3NjYxMjEwOTU1Njg5NDM1NjkxMDM0ODc1NzU1MjkyOTkwMTA5ODQ1Njg3MzI4ODE5OTg0MTQ3MDI4Mjc2OTAyOTA2MzMxODYzNjExNDEyMjIxMjg1MzA1NzQ5ODg2NjQ5NjE0MTE5OTA4ODgyMTAwNTcxMjE0MjAzNTc3MjExNTI5NTExNDI0ODgwODk3NzAzNDg0Nzg2MzIyOTUxNjk4MTU4MjQxMDM5OTQxMDI0MTcyOTkwMDA2OTIzMTcyOTY2Il0sIFsidGltZXN0YW1wIiwgIjMyNDEwNTAzMzA3NDEwMjYyMDU2MDU5MTgxNDMwOTg1OTQyNzE5MTA0MTgyODk3MjY3MDMyMjI2NDU4MTcwMTMxNDc2OTM2OTI3NTEyMTY1NDU0MDk1ODk3OTEwMTI3ODQ4NjU5NzE1NzY1Mzk0MDE2MTk4MzMxMjM5OTE4MTA5MDk5MTI2NTEyMTgwNTQ1NTg1MzgzNDIyMDc2NzgwMjYwMDM1OTE5Mzc0ODczMTY4MjEzMjg0NzY2OTk5NDM0MzAyNzM4MjY1NDE2NzgwOTU1NjY0NjE5ODQ5ODUwNzMwMDQ4MzE0MzEzMDkyNTQyMzY1OTQ1MTg4NDU2MzM3OTU3MTMwMDY2NjQwOTk5ODQ5MDUxNzc5ODU4MDU3NjI0MzQ4MDU1MTYyMjY3NTI3NTUyNzY0NDk1ODE2ODY4NzQ0NTg3MDc2Mjg2MzM5OTMxNDAzNjkwMjM2NDY1NDY0ODI0OTg3NjA2NzYxMjc0NTE2MjQ3MjYyMDk1NjMzMzQ4MTk0ODc0MjU4NzU4NzQyOTM1OTE5ODM3NDc5MjQyNzU5MDY3Nzk5OTU1NzA0NjYyOTM3NTY2NTE1NzUwODQzMTU5Mjg0NDg0MTA1OTI5MDc2NzI1MDAwMjU2OTk2ODY3NjIwNjc2MTExODU3MjcxNTIyMzQ0ODUxODQzNjUwNTQ0MjU1OTM4OTIyMDQwMTU2MDE2MDYwOTgwODA0NjQyNjkwNTM0OTI3NjMyMjgyMDczNzg1NDIyMDI1MzE0NDIwNDM2MTIwMjAwMDY2MzcwNjY3NTk3MTMxMDcxOTQxNjg4MDIxMjYxNDg0MzE0NDk0MjkzNjEzMDI5ODE1Mjk3NzIzMzc3MjQ4NzQwMDQwNjE1NjE2NDcxMjAyNDgyNzU1ODI0NjY3ODI2ODI0NjQyNDk2NTY2MyJdLCBbImFkZHJlc3MiLCAiMjE0NjcxNzc2MDM3NDM2NjkyODU5OTgxMzQxOTE1MTQ2OTQ2MTIzNTEyMTUxNDEyMjA2Nzk0NDA2NjkzMzc4NDk4NDg5OTYzODExNDc4NDkyNjM5MTY1OTMwMDkyODYyOTk4NTc5NTgxMTQ3Nzc4MDY5NjQyMDU4MTUzODI2ODMzODI4MDk5NTUzMjE3ODk1NjU4MTA4NzA4NTY3NTc1ODI3NDQ0MTAyNzY3Mzk3NDcwNTMxNDQ3MzUyNzEzMzE0MzU5NTI1MzgzMjI1NjY5NTQ5OTExMzg4NDU3MTYzNzc1MTE2Mjg1NzY5MDY5NjcyNjU5NDU2NDk4NzE2NzczOTUwNDkzNDYxOTg4MTQ2MDA4Nzg3NzU2NzMzMDAwMzg1NzgwOTQyMzUxODIyNzc2NTc0NTExOTg5MjA2NTE4NTA5NDk5NTU0OTc5NTcxODAyNjQxNjQ0NTYwMzgyNTIxMzIyMjQ2OTk0OTk5MDk3MDk5NDQzMjgxNTgwMDYyMDQxMDkyNjYyOTIzNTcxMTI5ODMyMDE4MTcyMTc5NzUxMDIzNjkyNDM2NDU0OTQwOTUyNTIxOTE3MjcxMjMzMjgzNzgwMTI0MzA5MTIwNzAzNTc0MTI5NTIwNTYwMDY3MjgzNTcxNjA4NjAyODAzODQ4MzUzNjE3NjMxMDU2Nzc2NzU2NDAwNDUzNDgwMjMxODIxODEwMTgzODk0NjEwMDk5OTUzNTEyMzE1NzkwODI2OTY5NzExNzQ1MDk0NzU1NjI1NDczNTc5ODcyNzM2MTE3NDI1MDg0NTI1MTE2NDQxMjQyODEyMTQzOTU0MjAyNTMwOTE0MTIzMDkxODQ1MTUwNzgxODk4ODY0NTEwMjQ1MzI5NDIwNDM2MzY0NzIwMjQzNjI5NzA2NzA1MDM3NDM5Mjc2NDQwMSJdXX0sICJub25jZSI6ICIxMTc0MTgwODI5MzgxODY2MDcxODUxMjU3In0="
          }
        }
      ],
      "credential_preview": {
        "@type": "https://didcomm.org/issue-credential/1.0/credential-preview",
        "attributes": [
          {
            "name": "email",
            "value": "eshan@mail.com"
          },
          {
            "name": "name",
            "value": "eshan"
          },
          {
            "name": "address",
            "value": "Dhaka"
          },
          {
            "name": "birthdate_dateint",
            "value": "04.04.2001"
          },
          {
            "name": "role",
            "value": "faculty"
          },
          {
            "name": "timestamp",
            "value": "1701848805416"
          }
        ]
      },
      "comment": "string"
    },
    "auto_offer": false,
    "updated_at": "2023-12-06T07:48:42.620846Z",
    "schema_id": "NsZG7LZT1c84GmdiswtUhf:2:web schema:80.95.89",
    "credential_offer": {
      "schema_id": "NsZG7LZT1c84GmdiswtUhf:2:web schema:80.95.89",
      "cred_def_id": "NsZG7LZT1c84GmdiswtUhf:3:CL:229891:faber.agent.web_schema",
      "nonce": "1174180829381866071851257",
      "key_correctness_proof": {
        "c": "105098827835650451469724209873556500411226024883169708769402737353266236829102",
        "xz_cap": "981429134669131288591718728114852608660215858691783439812063294474156994925788325286282205848510907879019524847946922515563937032250479199957387171997770560055624889177136828101972860789250390016457460766289628348239192168245415499250394430962924008770164834736347537116565964209148530747009673050916102382918081791645303476788058779291090932046762516995368092894896948353603564744674126821638663911355428647729692685288802911482245806478137749653064986350275816335697621199920606503457331242566297609106584036066948426521700802508035086205340150557284794988581731916707318418588957242042006431914061135510079934694614152881537511745950187231406242556773043622921215045586203166925962764303897",
        "xr_cap": [
          [
            "birthdate_dateint",
            "782917002011008791225494874827676580576257183423007147834790639646323094699665410121701546862916474103071653595851397636221010736190552232914990305770450442415346228641084979388162347455278258677163775645721099252033739055620582154278917031496725721991162410731307513540410735899386501455305067910630872558725598654682910435343488861275464463522284837901783872274046229107097155822113663670826257935489542072255901488746630039618027581603276039919458445459964658035941662020469929156272296089831554245801777462358931145094379534942642584755260416705858733543554555034855368631912207322141441091902396329529722721816488870906885851139975979267308253518879895579989316475220249090219706111978150"
          ],
          [
            "role",
            "1830821205306166272424907982713818298655791953061866642856903277789525094330336562584088553455517174345248458897719496684342459588003955501843094620839483549303784020606588534997074262902292190466870015484003659166893863153279880044345236570661082385650408583843389028601744135896237722535549430222004319487831695731346650835108677828829979460585631201467764520536459605985662332787152244288072931648714943620123054159934639081264405704120496541824216028535843333851689173831585144876735513875035065374474583728463958527053328336720122221631740781290527836071912495068433699842919440615089002864675035391027705937308689358345871678768177170545100974559301165443707663698016851061590838278514768"
          ],
          [
            "name",
            "1093366366862046631562036386742901265267569664003103653934179294671192139241214503426095944207633242564768925913344247841595437347934695494520001991734878956047920634672569767537120978260651409745199164041391477748801803612549687183560829742789094827570024647596924286669722102205934015831510506683016784229939864616001662934839146308393797454498727039187214460376404047457997075461409136142513642807046343127071975166883741777971524521742386730118143251731821315050720260671610562628699786404868392702004328396679566610818165013908956650037848756319268629577106192806163258638542294177299243551743387639416078528696692859143399061176152067492525385844524731444190208552885261676729600395838280"
          ],
          [
            "email",
            "2072224914618442928403587229141317134545397478901704590674852703151926609818075806953545650400454157443982646509492025240082371365132251171416486564874187208899338554214135778059076006600531305510068186229305936010100821671886329955884926438843895726096149768151984145729272883301847305291090555314057936277050529697796794306678744353998201044334332609565953424199077845308565706270132655376845330769955409979540379406248632217137931686265290224435833903089998062773535157258175166044363046303180282707929694754169415451428983874747647536573086240572752283421163549473545897154077165964441234444718214946503038720681191731840053186817787690324753548085687347115045650473420389925138311715243781"
          ],
          [
            "master_secret",
            "1388915292097973589693632849453891247513524713881788063510015738893409224500246720764975614406316511113986435094259549056532177602065906932969496063128520270612646047821459543834132669163647814820073793256278477035008266796739530268250460308539309938921007674533871110083328184297526126691527851382818527928091300045081500374023999050109598282228009589853752149879615488295029205432375250906918143343562070492483342903376664773593387273624484596136420897620485429390938451720196313898724865358479421247661210955689435691034875755292990109845687328819984147028276902906331863611412221285305749886649614119908882100571214203577211529511424880897703484786322951698158241039941024172990006923172966"
          ],
          [
            "timestamp",
            "324105033074102620560591814309859427191041828972670322264581701314769369275121654540958979101278486597157653940161983312399181090991265121805455853834220767802600359193748731682132847669994343027382654167809556646198498507300483143130925423659451884563379571300666409998490517798580576243480551622675275527644958168687445870762863399314036902364654648249876067612745162472620956333481948742587587429359198374792427590677999557046629375665157508431592844841059290767250002569968676206761118572715223448518436505442559389220401560160609808046426905349276322820737854220253144204361202000663706675971310719416880212614843144942936130298152977233772487400406156164712024827558246678268246424965663"
          ],
          [
            "address",
            "2146717760374366928599813419151469461235121514122067944066933784984899638114784926391659300928629985795811477780696420581538268338280995532178956581087085675758274441027673974705314473527133143595253832256695499113884571637751162857690696726594564987167739504934619881460087877567330003857809423518227765745119892065185094995549795718026416445603825213222469949990970994432815800620410926629235711298320181721797510236924364549409525219172712332837801243091207035741295205600672835716086028038483536176310567767564004534802318218101838946100999535123157908269697117450947556254735798727361174250845251164412428121439542025309141230918451507818988645102453294204363647202436297067050374392764401"
          ]
        ]
      }
    },
    "initiator": "self",
    "role": "issuer",
    "credential_proposal_dict": {
      "@type": "https://didcomm.org/issue-credential/1.0/propose-credential",
      "@id": "52578cf8-1a96-4a51-9e57-4c6a20d2e4d0",
      "~trace": {
        "target": "log",
        "full_thread": true,
        "trace_reports": []
      },
      "credential_proposal": {
        "@type": "https://didcomm.org/issue-credential/1.0/credential-preview",
        "attributes": [
          {
            "name": "email",
            "value": "eshan@mail.com"
          },
          {
            "name": "name",
            "value": "eshan"
          },
          {
            "name": "address",
            "value": "Dhaka"
          },
          {
            "name": "birthdate_dateint",
            "value": "04.04.2001"
          },
          {
            "name": "role",
            "value": "faculty"
          },
          {
            "name": "timestamp",
            "value": "1701848805416"
          }
        ]
      },
      "comment": "string",
      "cred_def_id": "NsZG7LZT1c84GmdiswtUhf:3:CL:229891:faber.agent.web_schema"
    },
    "trace": true,
    "created_at": "2023-12-06T07:48:42.620846Z",
    "credential_exchange_id": "51941a75-645d-4e45-9ba8-ff4b6f66bad3",
    "auto_remove": true
  }
  ```

# Issuing JSON-LD credential

> You do not create a schema or cred def for a JSON-LD credential (these are only required for "indy" credentials).

- A response from `.../wallet/did/create` endpoint for creating DID with '`key`' method looks like this-
  ```json
  {
    "result": {
      "did": "did:key:zUC71KdwBhq1FioWh53VXmyFiGpewNcg8Ld42WrSChpMzzskRWwHZfG9TJ7hPj8wzmKNrek3rW4ZkXNiHAjVchSmTr9aNUQaArK3KSkTySzjEM73FuDV62bjdAHF7EMnZ27poCE",
      "verkey": "mV6482Amu6wJH8NeMqH3QyTjh6JU6N58A8GcirMZG7Wx1uyerzrzerA2EjnhUTmjiSLAp6CkNdpkLJ1NTS73dtcra8WUDDBZ3o455EMrkPyAtzst16RdTMsGe3ctyTxxJav",
      "posture": "wallet_only",
      "key_type": "bls12381g2",
      "method": "key"
    }
  }
  ```
- `did` attribute holds the DID itself.
- `verkey` stands for **verification key** which is likely a public key used to verify digital signatures. This ensures that the entity presenting the DID doc is indeed the owner of the DID.
- `posture` indicates the state of the DID with `wallet_only` suggesting that _the DID is only present in a wallet and not published on a blockchain_.

- VC that is sent to Alice from Faber (`.../issue-credential-2.0/send-offer` )-

  ```json
  {
    "state": "offer-sent",
    "created_at": "2023-12-07T15:28:36.965816Z",
    "updated_at": "2023-12-07T15:28:36.965816Z",
    "cred_ex_id": "77cc8b90-3abc-47c2-a793-43512d861072",
    "connection_id": "22021a1d-62ec-4f61-96e5-8101fb367deb",
    "thread_id": "25bd6519-c607-412c-ad2b-2e11b00586b1",
    "initiator": "self",
    "role": "issuer",
    "cred_proposal": {
      "@type": "https://didcomm.org/issue-credential/2.0/propose-credential",
      "@id": "1af97966-48f2-43d2-aca5-91fb26069b66",
      "formats": [
        {
          "attach_id": "ld_proof",
          "format": "aries/ld-proof-vc-detail@v1.0"
        }
      ],
      "filters~attach": [
        {
          "@id": "ld_proof",
          "mime-type": "application/json",
          "data": {
            "base64": "eyJjcmVkZW50aWFsIjogeyJAY29udGV4dCI6IFsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiLCAiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwgInR5cGUiOiBbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwgIlVuaXZlcnNpdHlEZWdyZWVDcmVkZW50aWFsIl0sICJpc3N1ZXIiOiAiZGlkOmtleTp6VUM3SDlEWUpjNEp2WFF6QVh3VlF4Mnhra01xM3N0SmtQb1VSdjlNRVlIdngxeUtBYmFyNUZjTFVkazRzSjVvNlROczZxYUN5a0J0ODFFY3Z1UTFTaGFzSkRGYm5XajJKbTlYSHNHRkZoQ1M5eGhpaXhtUWtLbUw2dUw2RGppUmhvdHQxdHAiLCAiaXNzdWFuY2VEYXRlIjogIjIwMjAtMDEtMDFUMTI6MDA6MDBaIiwgImNyZWRlbnRpYWxTdWJqZWN0IjogeyJpZCI6ICJkaWQ6a2V5OnpVQzc3YW9iY2h4bW04ZnphTmVnRTZRc3NUZ241cXlSMnNReEczUXAzY1RmNG9SaGhRalhMcGdnWG9ING9HN0diUk1zMzI5bnJicGZoaDVRRzM0em8xRlBpNExMZWZ4OVdYemRkbmFwTVZuWlpYVzhGa2g0eWdiYlNaQnU2V0FmTG41bmF2cyIsICJnaXZlbk5hbWUiOiAiU2FsbHkiLCAiZmFtaWx5TmFtZSI6ICJTdHVkZW50IiwgImRlZ3JlZSI6IHsidHlwZSI6ICJCYWNoZWxvckRlZ3JlZSIsICJkZWdyZWVUeXBlIjogIlVuZGVyZ3JhZHVhdGUiLCAibmFtZSI6ICJCYWNoZWxvciBvZiBTY2llbmNlIGFuZCBBcnRzIn0sICJjb2xsZWdlIjogIkZhYmVyIENvbGxlZ2UifX0sICJvcHRpb25zIjogeyJwcm9vZlR5cGUiOiAiQmJzQmxzU2lnbmF0dXJlMjAyMCJ9fQ=="
          }
        }
      ]
    },
    "cred_offer": {
      "@type": "https://didcomm.org/issue-credential/2.0/offer-credential",
      "@id": "25bd6519-c607-412c-ad2b-2e11b00586b1",
      "~thread": {},
      "formats": [
        {
          "attach_id": "ld_proof",
          "format": "aries/ld-proof-vc-detail@v1.0"
        }
      ],
      "offers~attach": [
        {
          "@id": "ld_proof",
          "mime-type": "application/json",
          "data": {
            "base64": "eyJjcmVkZW50aWFsIjogeyJAY29udGV4dCI6IFsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiLCAiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiLCAiaHR0cHM6Ly93M2lkLm9yZy9zZWN1cml0eS9iYnMvdjEiXSwgInR5cGUiOiBbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwgIlVuaXZlcnNpdHlEZWdyZWVDcmVkZW50aWFsIl0sICJpc3N1ZXIiOiAiZGlkOmtleTp6VUM3SDlEWUpjNEp2WFF6QVh3VlF4Mnhra01xM3N0SmtQb1VSdjlNRVlIdngxeUtBYmFyNUZjTFVkazRzSjVvNlROczZxYUN5a0J0ODFFY3Z1UTFTaGFzSkRGYm5XajJKbTlYSHNHRkZoQ1M5eGhpaXhtUWtLbUw2dUw2RGppUmhvdHQxdHAiLCAiaXNzdWFuY2VEYXRlIjogIjIwMjAtMDEtMDFUMTI6MDA6MDBaIiwgImNyZWRlbnRpYWxTdWJqZWN0IjogeyJpZCI6ICJkaWQ6a2V5OnpVQzc3YW9iY2h4bW04ZnphTmVnRTZRc3NUZ241cXlSMnNReEczUXAzY1RmNG9SaGhRalhMcGdnWG9ING9HN0diUk1zMzI5bnJicGZoaDVRRzM0em8xRlBpNExMZWZ4OVdYemRkbmFwTVZuWlpYVzhGa2g0eWdiYlNaQnU2V0FmTG41bmF2cyIsICJnaXZlbk5hbWUiOiAiU2FsbHkiLCAiZmFtaWx5TmFtZSI6ICJTdHVkZW50IiwgImRlZ3JlZSI6IHsidHlwZSI6ICJCYWNoZWxvckRlZ3JlZSIsICJkZWdyZWVUeXBlIjogIlVuZGVyZ3JhZHVhdGUiLCAibmFtZSI6ICJCYWNoZWxvciBvZiBTY2llbmNlIGFuZCBBcnRzIn0sICJjb2xsZWdlIjogIkZhYmVyIENvbGxlZ2UifX0sICJvcHRpb25zIjogeyJwcm9vZlR5cGUiOiAiQmJzQmxzU2lnbmF0dXJlMjAyMCJ9fQ=="
          }
        }
      ]
    },
    "by_format": {
      "cred_proposal": {
        "ld_proof": {
          "credential": {
            "@context": [
              "https://www.w3.org/2018/credentials/v1",
              "https://www.w3.org/2018/credentials/examples/v1"
            ],
            "type": ["VerifiableCredential", "UniversityDegreeCredential"],
            "issuer": "did:key:zUC7H9DYJc4JvXQzAXwVQx2xkkMq3stJkPoURv9MEYHvx1yKAbar5FcLUdk4sJ5o6TNs6qaCykBt81EcvuQ1ShasJDFbnWj2Jm9XHsGFFhCS9xhiixmQkKmL6uL6DjiRhott1tp",
            "issuanceDate": "2020-01-01T12:00:00Z",
            "credentialSubject": {
              "id": "did:key:zUC77aobchxmm8fzaNegE6QssTgn5qyR2sQxG3Qp3cTf4oRhhQjXLpggXoH4oG7GbRMs329nrbpfhh5QG34zo1FPi4LLefx9WXzddnapMVnZZXW8Fkh4ygbbSZBu6WAfLn5navs",
              "givenName": "Sally",
              "familyName": "Student",
              "degree": {
                "type": "BachelorDegree",
                "degreeType": "Undergraduate",
                "name": "Bachelor of Science and Arts"
              },
              "college": "Faber College"
            }
          },
          "options": {
            "proofType": "BbsBlsSignature2020"
          }
        }
      },
      "cred_offer": {
        "ld_proof": {
          "credential": {
            "@context": [
              "https://www.w3.org/2018/credentials/v1",
              "https://www.w3.org/2018/credentials/examples/v1",
              "https://w3id.org/security/bbs/v1"
            ],
            "type": ["VerifiableCredential", "UniversityDegreeCredential"],
            "issuer": "did:key:zUC7H9DYJc4JvXQzAXwVQx2xkkMq3stJkPoURv9MEYHvx1yKAbar5FcLUdk4sJ5o6TNs6qaCykBt81EcvuQ1ShasJDFbnWj2Jm9XHsGFFhCS9xhiixmQkKmL6uL6DjiRhott1tp",
            "issuanceDate": "2020-01-01T12:00:00Z",
            "credentialSubject": {
              "id": "did:key:zUC77aobchxmm8fzaNegE6QssTgn5qyR2sQxG3Qp3cTf4oRhhQjXLpggXoH4oG7GbRMs329nrbpfhh5QG34zo1FPi4LLefx9WXzddnapMVnZZXW8Fkh4ygbbSZBu6WAfLn5navs",
              "givenName": "Sally",
              "familyName": "Student",
              "degree": {
                "type": "BachelorDegree",
                "degreeType": "Undergraduate",
                "name": "Bachelor of Science and Arts"
              },
              "college": "Faber College"
            }
          },
          "options": {
            "proofType": "BbsBlsSignature2020"
          }
        }
      }
    },
    "auto_offer": false
  }
  ```

  > `.../credentials/w3c` endpoint to retrieve all JSON-LD credentials in your wallet

- Alice stored it like this ( you can query it from `.../credential/w3c/{credential_id}` ) -

  ```json
  {
    "contexts": [
      "https://www.w3.org/2018/credentials/examples/v1",
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/bbs/v1"
    ],
    "expanded_types": [
      "https://www.w3.org/2018/credentials#VerifiableCredential",
      "https://example.org/examples#UniversityDegreeCredential"
    ],
    "schema_ids": [],
    "issuer_id": "did:key:zUC7H9DYJc4JvXQzAXwVQx2xkkMq3stJkPoURv9MEYHvx1yKAbar5FcLUdk4sJ5o6TNs6qaCykBt81EcvuQ1ShasJDFbnWj2Jm9XHsGFFhCS9xhiixmQkKmL6uL6DjiRhott1tp",
    "subject_ids": [
      "did:key:zUC77aobchxmm8fzaNegE6QssTgn5qyR2sQxG3Qp3cTf4oRhhQjXLpggXoH4oG7GbRMs329nrbpfhh5QG34zo1FPi4LLefx9WXzddnapMVnZZXW8Fkh4ygbbSZBu6WAfLn5navs"
    ],
    "proof_types": ["BbsBlsSignature2020"],
    "cred_value": {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1",
        "https://w3id.org/security/bbs/v1"
      ],
      "type": ["VerifiableCredential", "UniversityDegreeCredential"],
      "issuer": "did:key:zUC7H9DYJc4JvXQzAXwVQx2xkkMq3stJkPoURv9MEYHvx1yKAbar5FcLUdk4sJ5o6TNs6qaCykBt81EcvuQ1ShasJDFbnWj2Jm9XHsGFFhCS9xhiixmQkKmL6uL6DjiRhott1tp",
      "issuanceDate": "2020-01-01T12:00:00Z",
      "credentialSubject": {
        "id": "did:key:zUC77aobchxmm8fzaNegE6QssTgn5qyR2sQxG3Qp3cTf4oRhhQjXLpggXoH4oG7GbRMs329nrbpfhh5QG34zo1FPi4LLefx9WXzddnapMVnZZXW8Fkh4ygbbSZBu6WAfLn5navs",
        "givenName": "Sally",
        "familyName": "Student",
        "degree": {
          "type": "BachelorDegree",
          "degreeType": "Undergraduate",
          "name": "Bachelor of Science and Arts"
        },
        "college": "Faber College"
      },
      "proof": {
        "type": "BbsBlsSignature2020",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:key:zUC7H9DYJc4JvXQzAXwVQx2xkkMq3stJkPoURv9MEYHvx1yKAbar5FcLUdk4sJ5o6TNs6qaCykBt81EcvuQ1ShasJDFbnWj2Jm9XHsGFFhCS9xhiixmQkKmL6uL6DjiRhott1tp#zUC7H9DYJc4JvXQzAXwVQx2xkkMq3stJkPoURv9MEYHvx1yKAbar5FcLUdk4sJ5o6TNs6qaCykBt81EcvuQ1ShasJDFbnWj2Jm9XHsGFFhCS9xhiixmQkKmL6uL6DjiRhott1tp",
        "created": "2023-12-07T15:28:46.902609+00:00",
        "proofValue": "tnynjmJSbWmjTX+QLbUdSs1qc+ti8vaA5oBJFO6tS6vKML8YDfSaDrPv+YCJOishPG6r4+zrYxkYcX5ByISGXCoDOaa+VS145uQTekh4QuQ1JjxAmAdi+5BGmvsSbBtI4FMhEwckDrhvqWFQUYA/dw=="
      }
    },
    "cred_tags": {},
    "record_id": "2aa44bbc71e64636b14549a0069b2eb5"
  }
  ```

  > `record_id` is the _credential id_.

  > `credentialSubject.id` attribute has _Alice's wallet DID_.

  > `issuer` attribute has _faber's wallet DID_.

  > connection DID and those DID's are different. Those (**used in VC**) were created from `.../wallet/did/create` endpoint.

###### `NGROK_ENDPOINT=$(curl --silent localhost:4040/api/tunnels | $JQ -r '.tunnels[0].public_url')`

- output of `curl --silent localhost:4040/api/tunnels` -

  ```json
  {
    "tunnels": [
      {
        "name": "second",
        "ID": "c29e5e53519779c42b1acb934c5ec950",
        "uri": "/api/tunnels/second",
        "public_url": "https://63f0-123-136-28-130.ngrok-free.app",
        "proto": "https",
        "config": { "addr": "http://localhost:9999", "inspect": true },
        "metrics": {
          "conns": {
            "count": 7,
            "gauge": 0,
            "rate1": 2.9822854175471245e-16,
            "rate5": 0.000021412084385282962,
            "rate15": 0.0006061554546404767,
            "p50": 137289689,
            "p90": 5350746316,
            "p95": 5350746316,
            "p99": 5350746316
          },
          "http": {
            "count": 7,
            "rate1": 2.9822854175471245e-16,
            "rate5": 0.000021412084253148553,
            "rate15": 0.0006061423749069221,
            "p50": 55895437,
            "p90": 269777106,
            "p95": 269777106,
            "p99": 269777106
          }
        }
      },
      {
        "name": "first",
        "ID": "6e42af50832065a2ba44bbdd897c4700",
        "uri": "/api/tunnels/first",
        "public_url": "https://0bf2-123-136-28-130.ngrok-free.app",
        "proto": "https",
        "config": { "addr": "http://localhost:8020", "inspect": true },
        "metrics": {
          "conns": {
            "count": 0,
            "gauge": 0,
            "rate1": 0,
            "rate5": 0,
            "rate15": 0,
            "p50": 0,
            "p90": 0,
            "p95": 0,
            "p99": 0
          },
          "http": {
            "count": 0,
            "rate1": 0,
            "rate5": 0,
            "rate15": 0,
            "p50": 0,
            "p90": 0,
            "p95": 0,
            "p99": 0
          }
        }
      }
    ],
    "uri": "/api/tunnels"
  }
  ```
- The whole command extracts and assigns "https://0bf2-123-136-28-130.ngrok-free.app"
> The URL corresponds to the webhook url that we use in our controller.
