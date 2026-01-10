from typing import Optional
from pydantic import BaseModel, ConfigDict


class Trip(BaseModel):
    name: str
    description: Optional[str]
    # start_date: str
    # end_date: str
    joiner_total_count: int


class ShowTrip(Trip):
    # include id in JSON
    id: int

    # extract using dot notation .id instead of map keys ["id"]
    model_config = ConfigDict(from_attributes=True)
    pass

