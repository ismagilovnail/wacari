<?php

namespace App\Repositories;

use App\Models\Continent;
use App\Models\Country;
use App\Models\Tip;
use Illuminate\Support\Collection;

class MenuRepositories
{
    /**
     * Получение модели континентов
     * @var \App\Models\Continent
     */
    protected Continent $continents;

    /**
     * Получение модели стран
     *
     * @var \App\Models\Country
     */
    protected Country $country;

    protected Tip $tips;

    public function __construct()
    {
        $this->continents = new Continent();
        $this->country = new Country();
        $this->tips = new Tip();
    }

    /**
     * Получение континентов
     *
     * @return \Illuminate\Support\Collection
     */
    public function getContinents(): Collection
    {
        return $this->continents->oldest()->get();
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function getCountries(): Collection
    {
        return $this->country->oldest()->get();
    }
    /**
     * Получение континентов и стран
     *
     * @return \Illuminate\Support\Collection
     */
    public function getContinentsCountries(): Collection
    {
        return $this->country->with('continent')->oldest()->get();
    }

    /**
     * Получение подсказок
     *
     * @return \Illuminate\Support\Collection
     */
    public function getTips(): Collection
    {
        return $this->tips->oldest()->get();
    }
}
