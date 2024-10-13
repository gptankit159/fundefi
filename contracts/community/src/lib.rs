#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, token::Client as TokenClient,
    Address, Env, Symbol, Vec, log,
};

#[contract]
pub struct DAODonation;

#[derive(Clone, Debug)]
#[contracttype]
pub struct Subscriber {
    address: Address,
    amount: i128,
}

#[contractimpl]
impl DAODonation {
    // Initialize the contract with the USDC contract address
    pub fn initialize(env: Env, usdc_contract: Address) {
        if env.storage().instance().get::<_, Address>(&Symbol::new(&env, "USDC_CONTRACT")).is_some() {
            panic!("Contract is already initialized");
        }
        log!(&env, "Initializing contract with USDC contract address: {:?}", usdc_contract);
        env.storage()
            .instance()
            .set(&Symbol::new(&env, "USDC_CONTRACT"), &usdc_contract);
        log!(&env, "USDC contract address set successfully");
    }

    // Create a new community
    pub fn create_community(env: Env, owner: Address, community_name: Symbol) {
        let community_owner_key = Self::get_community_owner_key(&env, &community_name);
        if env.storage().persistent().get::<_, Address>(&community_owner_key).is_some() {
            panic!("Community with this name already exists");
        }
        log!(&env, "Creating community: {:?}", community_name);

        // Initialize subscribers list
        let subscribers = Vec::<Subscriber>::new(&env);
        log!(&env, "Initialized subscribers: {:?}", subscribers);
        log!(&env, "Owner: {:?}", owner);

        // Store community owner and subscribers separately
        env.storage()
            .persistent()
            .set(&community_owner_key, &owner);
        
        let community_subscribers_key = Self::get_community_subscribers_key(&env, &community_name);
        env.storage()
            .persistent()
            .set(&community_subscribers_key, &subscribers);
        
        // Add community to the list of all communities
        let mut all_communities: Vec<Symbol> = env
            .storage()
            .persistent()
            .get(&Symbol::new(&env, "ALL_COMMUNITIES"))
            .unwrap_or(Vec::new(&env));
        all_communities.push_back(community_name.clone());
        env.storage()
            .persistent()
            .set(&Symbol::new(&env, "ALL_COMMUNITIES"), &all_communities);

        log!(&env, "Community created successfully: {:?}", community_name);
    }

    // Subscribe to monthly donations for a specific community
    pub fn subscribe(
    env: Env,
    community_name: Symbol,
    subscriber: Address,
    monthly_amount: i128,
    ) {
        log!(
            &env,
            "Subscribing to community: {:?} with subscriber: {:?}, monthly amount: {}",
            community_name,
            subscriber,
            monthly_amount
        );
    
        // Require authorization from the subscriber
        subscriber.require_auth();
    
        // Ensure monthly_amount is positive
        if monthly_amount <= 0 {
            log!(&env, "Error: Monthly amount must be positive");
            panic!("Monthly amount must be positive");
        }
    
        // Retrieve owner and subscribers
        let community_owner_key = Self::get_community_owner_key(&env, &community_name);
        let _owner: Address = env
            .storage()
            .persistent()
            .get(&community_owner_key)
            .expect("Community not found");
    
        let community_subscribers_key =
            Self::get_community_subscribers_key(&env, &community_name);
        let mut subscribers: Vec<Subscriber> = env
            .storage()
            .persistent()
            .get(&community_subscribers_key)
            .expect("Community not found");
    
        // Ensure the subscriber is not already registered
        for existing_subscriber in subscribers.iter() {
            if existing_subscriber.address == subscriber {
                panic!("Subscriber is already registered");
            }
        }
    
        subscribers.push_back(Subscriber {
            address: subscriber.clone(),
            amount: monthly_amount,
        });
    
        env.storage()
            .persistent()
            .set(&community_subscribers_key, &subscribers);
    
        log!(&env, "Subscriber added successfully: {:?}", subscriber);
    }

    // Collect monthly donations from all subscribers of a specific community
    pub fn collect_donations(env: Env, community_name: Symbol) {
        log!(
            &env,
            "Collecting donations for community: {:?}",
            community_name
        );
        let usdc_contract: Address = env
            .storage()
            .instance()
            .get(&Symbol::new(&env, "USDC_CONTRACT"))
            .expect("USDC contract address not set");
        log!(
            &env,
            "USDC contract address retrieved successfully: {:?}",
            usdc_contract
        );

        let community_owner_key = Self::get_community_owner_key(&env, &community_name);
        let owner: Address = env
            .storage()
            .persistent()
            .get(&community_owner_key)
            .expect("Community not found");

        let community_subscribers_key =
            Self::get_community_subscribers_key(&env, &community_name);
        let subscribers: Vec<Subscriber> = env
            .storage()
            .persistent()
            .get(&community_subscribers_key)
            .expect("Community not found");
        log!(
            &env,
            "Community retrieved successfully: {:?}",
            community_name
        );

        // Create a token client
        let token = TokenClient::new(&env, &usdc_contract);

        log!(&env, "TokenClient created successfully");

        log!(&env, "Subscribers: {:?}", subscribers);

        for subscriber in subscribers.iter() {
            // Transfer tokens from subscriber to owner
            token.transfer_from(
                &subscriber.address,
                &owner,
                &env.current_contract_address(), // Contract as spender
                &subscriber.amount,
            );
            log!(
                &env,
                "Collected {} from subscriber: {:?}",
                subscriber.amount,
                subscriber.address
            );
        }
    }

    // Get all communities
    pub fn get_all_communities(env: Env) -> Vec<Symbol> {
        let all_communities: Vec<Symbol> = env
            .storage()
            .persistent()
            .get(&Symbol::new(&env, "ALL_COMMUNITIES"))
            .unwrap_or(Vec::new(&env));
        log!(&env, "Communities retrieved successfully: {:?}", all_communities);
        all_communities
    }

    // Get all subscriptions for a specific community
    pub fn get_all_subscriptions(env: Env, community_name: Symbol) -> Vec<Subscriber> {
        let community_subscribers_key = Self::get_community_subscribers_key(&env, &community_name);
        let subscribers: Vec<Subscriber> = env
            .storage()
            .persistent()
            .get(&community_subscribers_key)
            .expect("Community not found");
        log!(
            &env,
            "Subscribers for community {:?} retrieved successfully: {:?}",
            community_name,
            subscribers
        );
        subscribers
    }

    // Helper function to get the community owner key
    fn get_community_owner_key(env: &Env, community_name: &Symbol) -> (Symbol, Symbol) {
        (Symbol::new(env, "COMMUNITY_OWNER"), community_name.clone())
    }

    // Helper function to get the community subscribers key
    fn get_community_subscribers_key(env: &Env, community_name: &Symbol) -> (Symbol, Symbol) {
        (Symbol::new(env, "COMMUNITY_SUBSCRIBERS"), community_name.clone())
    }
}