# Inspiration & Philosophy

After years of building [safety-critical](https://en.wikipedia.org/wiki/Safety-critical_system) and mission-critical software in healthcare, finance, and e-commerce, I’ve come to value simple, readable, and maintainable tests — not just for correctness, but for the design clarity they demand.

> “Inside every large program, there is a small program trying to get out.”  
> — C. A. R. Hoare

Good tests act as clear **specifications**. The `{P} C {Q}` structure mirrors how we reason: _given_, _when_, _then_. Tests should make behavior obvious — not obscure it behind clever abstractions or framework magic.

> “A program is a specification of behavior.”  
> — C. A. R. Hoare

Modern test tools have grown complex, often compensating for design flaws instead of helping reveal them. **Hoare** aims to reverse that — with a minimal API that helps you focus on your code, not the tool.

> “The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich find most hard to pay.”  
> — C. A. R. Hoare

### Also inspired by:

- [Rethinking Unit Test Assertions](https://medium.com/javascript-scene/rethinking-unit-test-assertions-55f59358253f) by [Eric Elliott](https://medium.com/@_ericelliott)
- [tape](https://github.com/substack/tape), [AVA](https://github.com/avajs/ava), and [node-tap](https://github.com/tapjs/node-tap)