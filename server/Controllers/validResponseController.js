module.exports = ({type, token, customer}) => {
  switch (type) {
    case "login":
      return {
        "customer": {
          "schema": {
            "customer_id": customer["customer_id"],
            "name": customer["name"],
            "email": customer["email"],
            "address_1": customer["address_1"],
            "address_2": customer["address_1"],
            "city": customer["city"],
            "region": customer["region"],
            "postal_code": customer["postal_code"],
            "country": customer["country"],
            "shipping_region_id": customer["shipping_region_id"],
            "day_phone": customer["day_phone"],
            "eve_phone": customer["eve_phone"],
            "mob_phone": customer["mob_phone"],
            "credit_card": customer["credit_card"]
          }
        },
        "accessToken": `Bearer ${token}`,
        "expires_in": "24h"
      }
      break;
    case "register":
      return {
        "customer": {
          "schema": {
            "customer_id": customer["customer_id"],
            "name": customer["name"],
            "email": customer["email"],
            "address_1": null,
            "address_2": null,
            "city": null,
            "region": null,
            "postal_code": null,
            "country": null,
            "shipping_region_id": 1,
            "day_phone": null,
            "eve_phone": null,
            "mob_phone": null,
            "credit_card": null
          }
        },
        "accessToken": `Bearer ${token}`,
        "expires_in": "24h"
      }
      break;
  
    default:
      break;
  }
}