---
title: Distributed Accomplishable Intents
description:  We should aim to turn the address bar into a search engine. Encoding the function calls and search terms for desired outcome into a natural language system.
author: https://github.com/MikeD123
---

> [source commit](https://github.com/MikeD123/Stuff/blob/8d2f18232e4e345df60cf8547dae9138f9664c2a/Distributed%20Accomplishable%20Intents/README.md)

### Distributed Accomplishable Intents

#### tl;dr - We should aim to turn the address bar into a search engine. Encoding the function calls and search terms for desired outcome into a natural language system.

If you are looking for a simple mental model think of it this way…

* New users get something like an Amazon 1 click checkout for Ethereum smart contract interactions.
* New users get a familiar “Google” like interface UX/UI flow.

Can I borrow your brain for a second? I need you to try and wipe the idea of the address bar as a way to send and receive assets. Pasting in the janky addresses. Going through triple checking a bunch a characters to make sure they’re correct, then finally pulling the trigger and clicking confirm.

In fintech these are referred to as “payment intents” where we have a finite path that user can go down to checkout. Sort of how you present different fields based on what payment method you choose, it’s like a pre-defined path to collect the necessary information as seamlessly as possible to complete your checkout.

An example for crypto would be with MakerDAO. “Deposit collateral and generate DAI”. Because it’s a common use-case, a pre-defined intent of users opening CDP’s it means that we can build a one click behaviour.

![makerExample](https://i.imgur.com/afEbEXo.png)

It’s a common theme, and will only trend more and more toward repeated value adding intents.

Think of it more as a way to “communicate” your goals and intentions of your payment to a distributed system.

What’s next?

Well, if you didn’t bother reading all that, then just watch the below, should explain it.
![image](https://i.imgur.com/giyY7YE.gif)

Ok, so you now how before I asked you to throw everything about addresses and stuff in the bin? Ok, now is where I need to borrow your brain for a second and consider the following. Watch the video on intents above if you haven’t. It’s two f’ing seconds, just watch the damn thing lol. So lets turn the address bar into a search engine of pre-defined intents that people use every day.

So instead of going to uniswap to convert DAI to WBTC, I send DAI to a contract address which does one thing and only one thing. It takes DAI and trades it on Uniswap for WBTC and sends the proceeds (after gas) back to whoever sent the DAI. Simple enough. Now lets say we repeat this across all teams specializing in different intents (swap, earn, borrow, trade, lend, save, etc…) we end up with a broad “dictionary” of pre-defined secure intents for users. Like bookmarks available to help them learn financial primitives. We wrap that into natural language domain structures, e.g. verbNoun following other similar intent systems like Siri, Alexa, Google home. End result, a bunch of ENS addresses!

Example Language
* “Deposit.ToSavings.eth” (this deposits into compound, and returns CUSDC)
* “dai.toBitcoin.eth” (converts DAI to WBTC as outlined in the example above)

![examplesearch](https://i.imgur.com/oVWOeg2.gif)

The example above is just a bunch of addresses I had and setup into Algolia Search. Adding phrases and synonyms, we can get phrase like predictive search for our single purpose addresses.

We see a much richer and familiar UX/UI flow for users. We can use predictive search 

Think of metamask like a search bar you would use. But you’re not searching for something more so you are trying to accomplish a specific intent. Trying to make money, earn interest, yield farm, whatever it be. You’re on a mission :) That’s what is meant by intent in the context of this doc. Trying to accomplish something. We can be generalized or granular as much as we want. It’s standardized only by the user group interacting with it really.

I believe that this path requires ENS to collaborate with the community, and vice versa.

## Why do this?

My main reason is that I think this can build a really strong moat if implemented successfully. Not only from a UX perspective (using a system this way catches the next 6 billion users 600x faster), but if it works as intended, then it speaks volumes to the ability for the community to coordinate and assemble at scale informally, and that ultimately speaks volumes as a compass to the decentralization, and coordination of a specific system. It requires the community members that want to opt in, to define and categorize protocols and DAO’s.

Moving forward, I see it as a huge promotional channel for teams where they release a new feature and it’s a simplified governance mechanism. Proposing an ENS address and vote by depositing into it or whatever…

The end result is a really awesome natural language dictionary for users to tap in on their first day exploring the crypto and blockchain ecosystem. Like pre-defined set of book marks when you open your account for the first time, suggested intents, etc… Would be a safe bridge for new people too.

This rich ecosystem curation and collaboration should result in exponential resiliency in the system, and a cheaper way for users to get more value in their first times using the system. And these specific addresses are keys. Like smart butlers or trading assistance or whatever you think of it as. It’s an automated financial assistant, and the accomplishable intents are ones only relevant to the user. It should make searching and discovery of the protocols value, metrics, rates etc when you search for it. It sort of becomes like a Layer 2 for the address bar.

## Key Positions for Ethereum

* Etherscan for search and discovery of intents (Google). Already sort of doing this with function labeling.
* Metamask for signing/sending. But would probably look a lot different than its current ENS integration if people liked it.
* MyCrypto for security. Phishing and things like that probably come around so they would be good pillars for hard coded curated suggestions by them as trusted reputable voices in the ecosystem for that intent. Like you swap with uniswap, security with mycrypto or metamask. Etc...
* ENS for anchoring and its extensibility.
* Any "messenger" I think really. Zapper is another example and originally DeFi Zap was something I loved because they implemented something similar "longWBTC.defizap.eth
* Come to think of it, pretty much all non-custodial wallets I think. They could build around being secure search engines more than being a wallet. Sort of a different leap. 

## Conclusion

Not sure if ok boomer, or lost my mind... I feel like this would be the most value add a single core protocol could add that kicks value all the way back up the stack of dapps, users, and other chains would get value from.

Seems like coupling this with [RadSpec](https://github.com/aragon/radspec) you would start getting some very cool natural language chat going with your wallet and everyone could have their own personal financial assistant. It would mean that people wouldn't really need to be developers, but more assemble legos and then name them. Take a clip on the contract, and that's that. Feels like that would be a super cool future! Alright, I'm tired now and losing my mind in lockdown evidently!


## Tools / Starting Points?
* https://www.4byte.directory/ - Function signatures are the equivalent to meta tags and keywords for SEO.
* [RadSpec](https://github.com/aragon/radspec)
