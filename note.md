> **Faber API:** http://127.0.0.1:8021/api/doc#/

> **Live connections:** http://127.0.0.1:8021/connections

- **faber invitation** from the terminal is different from the **website invitation**.

# Notable mentions

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
